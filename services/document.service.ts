
import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, query, where, orderBy, addDoc, deleteDoc, Timestamp } from 'firebase/firestore';

export interface UserDocument {
  id: string;
  type: 'drivers_license' | 'social_security' | 'utility_bill' | 'id_theft_affidavit';
  status: 'pending' | 'verified' | 'rejected';
  fileUrl: string;
  fileName: string;
  mimeType: string;
  uploadedAt: Timestamp;
  verifiedAt?: Timestamp;
  metadata?: Record<string, any>;
}

export const REQUIRED_DOCUMENTS = [
  {
    type: 'drivers_license',
    label: 'Driver\'s License or State ID',
    description: 'A valid government-issued photo ID',
    required: true,
    acceptedTypes: ['image/jpeg', 'image/png', 'image/jpg'],
  },
  {
    type: 'social_security',
    label: 'Social Security Card',
    description: 'Your Social Security card or official SSA document',
    required: true,
    acceptedTypes: ['image/jpeg', 'image/png', 'image/jpg'],
  },
  {
    type: 'utility_bill',
    label: 'Proof of Address',
    description: 'Recent utility bill or bank statement (within 60 days)',
    required: true,
    acceptedTypes: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
  },
  {
    type: 'id_theft_affidavit',
    label: 'ID Theft Affidavit',
    description: 'Only required for identity theft disputes',
    required: false,
    acceptedTypes: ['application/pdf'],
  },
];

export async function uploadDocument(userId: string, file: File, type: string): Promise<UserDocument> {
  try {
    // For now, we'll store the file as base64 in Firestore
    // In production, you'd want to use proper file storage like Firebase Storage
    const reader = new FileReader();
    const fileData = await new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const date = Timestamp.now();
    const docRef = await addDoc(collection(db, 'users', userId, 'documents'), {
      type,
      status: 'pending',
      fileUrl: fileData,
      fileName: file.name,
      mimeType: file.type,
      uploadedAt: date,
      metadata: {
        size: file.size,
        lastModified: file.lastModified,
      },
    });

    return {
      id: docRef.id,
      type: type as UserDocument['type'],
      status: 'pending',
      fileUrl: fileData,
      fileName: file.name,
      mimeType: file.type,
      uploadedAt: date,
      metadata: {
        size: file.size,
        lastModified: file.lastModified,
      },
    };
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
}

export async function checkRequiredDocuments(userId: string): Promise<{
  hasAllRequired: boolean;
  missingDocuments: string[];
  documents: UserDocument[];
}> {
  try {
    // Get all user documents
    const docsRef = collection(db, 'users', userId, 'documents');
    const q = query(
      docsRef,
      where('status', '==', 'verified'),
      orderBy('uploadedAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    const documents = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as UserDocument[];

    // Check which required documents are missing
    const missingDocuments = REQUIRED_DOCUMENTS
      .filter(doc => doc.required)
      .filter(requiredDoc => 
        !documents.some(userDoc => 
          userDoc.type === requiredDoc.type && 
          userDoc.status === 'verified'
        )
      )
      .map(doc => doc.label);

    return {
      hasAllRequired: missingDocuments.length === 0,
      missingDocuments,
      documents,
    };
  } catch (error) {
    console.error('Error checking required documents:', error);
    throw error;
  }
}

export async function getDocumentsByType(userId: string, type: string): Promise<UserDocument[]> {
  try {
    const docsRef = collection(db, 'users', userId, 'documents');
    const q = query(
      docsRef,
      where('type', '==', type),
      orderBy('uploadedAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as UserDocument[];
  } catch (error) {
    console.error('Error getting documents by type:', error);
    throw error;
  }
}

export async function getDocument(userId: string, documentId: string): Promise<UserDocument | null> {
  try {
    const docRef = doc(db, 'users', userId, 'documents', documentId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data()
    } as UserDocument;
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
}

export const getUserDocuments = async (userId: string) => {
	try {
		const docRef = collection(db, `users/${userId}/documents`);
		const itemSnapshot = await getDocs(docRef);

		return itemSnapshot.docs.map((doc) => {
			return {
				id: doc.id,
				...doc.data(),
			};
		}) as UserDocument[];
	} catch (error) {
		console.log("Error getting user documents:", error);

		return [];
	}
};

export const deleteUserDocument = async (userId: string, documentId: string) => {
	try {
		const docRef = doc(db, `users/${userId}/documents`, documentId);
		await deleteDoc(docRef);
		return {
			success: true,
		}
	} catch (error) {
		console.log("Error deleting user document:", error);
		return {
			success: false,
			error: "Error deleting user document. Please try again later!",
		};
	}
}