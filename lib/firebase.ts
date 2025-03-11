import { initializeApp, getApps, FirebaseOptions } from 'firebase/app';
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';
import { enableIndexedDbPersistence, initializeFirestore, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getStorage } from "firebase/storage";


// Validate Firebase config before initialization
const validateConfig = (config: FirebaseOptions) => {
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  const missingFields = requiredFields.filter(field => !config[field as keyof FirebaseOptions]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required Firebase configuration fields: ${missingFields.join(', ')}`);
  }
};

// Initialize Firebase with better error handling
const initializeFirebase = () => {
  try {
    const firebaseConfig: FirebaseOptions = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    };

    // Validate config before proceeding
    validateConfig(firebaseConfig);

    // Initialize Firebase if not already initialized
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

    // Initialize Firestore with optimized settings
    const db = initializeFirestore(app, {
      cacheSizeBytes: CACHE_SIZE_UNLIMITED,
      experimentalAutoDetectLongPolling: true,
      ignoreUndefinedProperties: true,
    });

    // Initialize Auth
    const auth = getAuth(app);
    const storage = getStorage(app);

    // Set auth persistence
    if (typeof window !== 'undefined') {
      setPersistence(auth, browserLocalPersistence)
        .catch(error => {
          console.error('Error setting auth persistence:', error);
        });

      // Enable Firestore offline persistence
      enableIndexedDbPersistence(db, {
        forceOwnership: false
      }).catch(error => {
        if (error.code === 'failed-precondition') {
          console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
        } else if (error.code === 'unimplemented') {
          console.warn('Browser doesn\'t support persistence.');
        }
      });

      // Initialize analytics in production
      if (process.env.NODE_ENV === 'production') {
        isSupported().then(supported => {
          if (supported) {
            getAnalytics(app);
          }
        });
      }
    }

    return { app, auth, db, storage };
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
  }
};

// Initialize Firebase services
let services: ReturnType<typeof initializeFirebase>;

try {
  services = initializeFirebase();
} catch (error) {
  console.error('Failed to initialize Firebase services:', error);
  throw error;
}

// Export services
export const { auth, db, storage } = services;