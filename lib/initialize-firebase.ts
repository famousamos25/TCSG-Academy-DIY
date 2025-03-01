import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export async function initializeFirebaseCollections() {
  try {
    // Initialize OpenAI settings
    await setDoc(doc(db, 'settings', 'openai'), {
      openai_api_key: process.env.OPENAI_API_KEY || '',
      default_model: 'gpt-4-turbo-preview',
      max_tokens: 4000,
      temperature: 0.7,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    // Initialize tutorial video settings
    await setDoc(doc(db, 'settings', 'tutorial_video'), {
      value: 'xlnfx1ax34',
      updatedAt: new Date().toISOString()
    }, { merge: true });

    console.log('Firebase collections initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase collections:', error);
    throw error;
  }
}