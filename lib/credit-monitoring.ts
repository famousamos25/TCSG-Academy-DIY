import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { encrypt, decrypt } from '@/lib/encryption';

export interface CreditMonitoringCredentials {
  username: string;
  password: string;
}

export interface CreditReport {
  service: string;
  reportData: any;
  importedAt: Date;
}

export const creditMonitoring = {
  async saveCredentials(service: string, credentials: CreditMonitoringCredentials, userId: string) {
    try {
      // Encrypt credentials before storing
      const encryptedCredentials = {
        username: encrypt(credentials.username),
        password: encrypt(credentials.password)
      };
      
      await setDoc(doc(db, 'users', userId, 'credit_monitoring', service), {
        service,
        credentials: encryptedCredentials,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error saving credentials:', error);
      throw error;
    }
  },

  async getCredentials(service: string, userId: string) {
    try {
      const docRef = doc(db, 'users', userId, 'credit_monitoring', service);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return null;
      }

      const data = docSnap.data();
      return {
        username: decrypt(data.credentials.username),
        password: decrypt(data.credentials.password)
      };
    } catch (error) {
      console.error('Error getting credentials:', error);
      throw error;
    }
  },

  async saveReport(service: string, reportData: any, userId: string) {
    try {
      await setDoc(doc(collection(db, 'users', userId, 'credit_reports')), {
        service,
        reportData,
        importedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving report:', error);
      throw error;
    }
  },

  async getLatestReport(userId: string) {
    try {
      const q = query(
        collection(db, 'users', userId, 'credit_reports'),
        orderBy('importedAt', 'desc'),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return null;
      }

      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      } as any;
    } catch (error) {
      console.error('Error getting latest report:', error);
      throw error;
    }
  }
};