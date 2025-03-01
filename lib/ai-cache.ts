import { db } from '@/lib/firebase';
import { collection, doc, getDoc, setDoc, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import JSZip from 'jszip';

interface CachedResponse {
  id: string;
  prompt: string;
  response: string;
  type: 'dispute' | 'analysis' | 'letter';
  metadata: Record<string, any>;
  usage: number;
  createdAt: Date;
  expiresAt: Date;
}

export class AICache {
  private static instance: AICache;
  private memoryCache: Map<string, CachedResponse>;
  private readonly CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

  private constructor() {
    this.memoryCache = new Map();
  }

  public static getInstance(): AICache {
    if (!AICache.instance) {
      AICache.instance = new AICache();
    }
    return AICache.instance;
  }

  private generateCacheKey(type: string, params: Record<string, any>): string {
    const sortedParams = Object.keys(params)
      .sort()
      .reduce((acc, key) => {
        acc[key] = params[key];
        return acc;
      }, {} as Record<string, any>);

    return `${type}:${JSON.stringify(sortedParams)}`;
  }

  public async get(type: string, params: Record<string, any>): Promise<string | null> {
    const cacheKey = this.generateCacheKey(type, params);

    // Check memory cache first
    const memoryResult = this.memoryCache.get(cacheKey);
    if (memoryResult && memoryResult.expiresAt > new Date()) {
      return memoryResult.response;
    }

    // Check Firestore cache
    try {
      const cacheRef = doc(db, 'ai_cache', cacheKey);
      const cacheDoc = await getDoc(cacheRef);

      if (cacheDoc.exists()) {
        const data = cacheDoc.data() as CachedResponse;
        if (new Date(data.expiresAt) > new Date()) {
          // Update memory cache
          this.memoryCache.set(cacheKey, data);
          return data.response;
        }
      }
    } catch (error) {
      console.error('Cache read error:', error);
    }

    return null;
  }

  public async set(
    type: "dispute" | "analysis" | "letter",
    params: Record<string, any>,
    response: string,
    metadata: Record<string, any> = {}
  ): Promise<void> {
    const cacheKey = this.generateCacheKey(type, params);
    const now = new Date();
    const expiresAt = new Date(now.getTime() + this.CACHE_DURATION);

    const cacheEntry: CachedResponse = {
      id: cacheKey,
      prompt: JSON.stringify(params),
      response,
      type,
      metadata,
      usage: 1,
      createdAt: now,
      expiresAt,
    };

    // Update memory cache
    this.memoryCache.set(cacheKey, cacheEntry);

    // Update Firestore cache
    try {
      await setDoc(doc(db, 'ai_cache', cacheKey), cacheEntry);
    } catch (error) {
      console.error('Cache write error:', error);
    }
  }

  public async exportCache(): Promise<Blob> {
    const zip = new JSZip();
    const cacheFolder = zip.folder('ai_cache');

    if (!cacheFolder) throw new Error('Failed to create cache folder');

    try {
      const snapshot = await getDocs(collection(db, 'ai_cache'));
      snapshot.forEach(doc => {
        const data = doc.data();
        cacheFolder.file(`${doc.id}.json`, JSON.stringify(data, null, 2));
      });

      return await zip.generateAsync({ type: 'blob' });
    } catch (error) {
      console.error('Cache export error:', error);
      throw error;
    }
  }

  public async clearExpiredCache(): Promise<void> {
    const now = new Date();

    // Clear memory cache
    for (const [key, value] of this.memoryCache.entries()) {
      if (value.expiresAt <= now) {
        this.memoryCache.delete(key);
      }
    }

    // Clear Firestore cache
    try {
      const q = query(
        collection(db, 'ai_cache'),
        where('expiresAt', '<=', now)
      );
      
      const snapshot = await getDocs(q);
      // const batch = db.batch();
      
      // snapshot.docs.forEach(doc => {
      //   batch.delete(doc.ref);
      // });

      // await batch.commit();
    } catch (error) {
      console.error('Cache cleanup error:', error);
    }
  }
}

export const aiCache = AICache.getInstance();