import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = {
  "type": "service_account",
  "project_id": "tcsg-academy-diy-7f2a2",
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  "client_email": "firebase-adminsdk-fbsvc@tcsg-academy-diy-7f2a2.iam.gserviceaccount.com",
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": `https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40tcsg-academy-diy-7f2a2.iam.gserviceaccount.com`
};

const apps = getApps();

if (!apps.length) {
  initializeApp({
    credential: cert(serviceAccount as any),
    databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`
  });
}

const adminDb = getFirestore();
const adminAuth = getAuth();

export { adminDb, adminAuth };