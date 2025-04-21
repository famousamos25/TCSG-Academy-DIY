"use client";

import { auth, db } from '@/lib/firebase';
import { DisputeLetter } from '@/types/dispute-center';
import { collection, DocumentData, onSnapshot, Query, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const useDisputeLetters = (filters: Record<string, any>) => {
	const [letters, setLetters] = useState<DisputeLetter[]>([]);
	const [loading, setLoading] = useState(true);
	const [stats, setStats] = useState({ sent: 0, unsent: 0, completed: 0 });

	const [user] = useAuthState(auth);
	
	useEffect(() => {
		const fetchLetters = async () => {
			try {
				const lettersRef = collection(db, 'letters');

				const q: Query<DocumentData, DocumentData> = query(lettersRef, where('userId', '==', user?.uid));

				onSnapshot(q, (snapshot) => {
					const letterList = snapshot.docs.map(doc => ({
						id: doc.id,
						...doc.data(),
					})) as DisputeLetter[];

					if (filters?.letterSent) {
						setLetters(letterList.filter(letter => letter.letterSent));
						return;
					}

					if (filters?.letterCompleted) {
						setLetters(letterList.filter(letter => letter.letterCompleted));
						return;
					}

					setLetters(letterList.filter(letter => !letter.letterSent));
				});
				setLoading(false);
			} catch (error) {
				console.error("Error fetching letters:", error);
			}
		};

		if(user?.uid) fetchLetters();
	}, [filters, user?.uid]);

	useEffect(() => {
		const fetchLetters = async () => {
			try {
				const lettersRef = collection(db, 'letters');

				onSnapshot(lettersRef, (snapshot) => {
					const allLetters = snapshot.docs.map(doc => ({
						id: doc.id,
						...doc.data(),
					})) as DisputeLetter[];

					const sentCount = allLetters.filter(l => l.letterSent).length;
					const unsentCount = allLetters.filter(l => !l.letterSent).length;
					const completedCount = allLetters.filter(l => l.letterCompleted).length;

					setStats({ sent: sentCount, unsent: unsentCount, completed: completedCount });
				});

				setLoading(false);
			} catch (error) {
				console.error("Error fetching letters:", error);
			}
		};

		fetchLetters();
	}, []);

	return {
		letters,
		loading,
		stats
	};
};

export default useDisputeLetters;