import { useAuthState } from 'react-firebase-hooks/auth';
import { Timestamp, arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { auth } from '../firebase/firebaseClient';
import { useFetchUserData } from './useFetchUserData';
import { useAppDispatch } from './reduxHooks';
import { setErrorValue } from '../redux/errorPopupReduxSlice/errorPopupSlice';
import { UseNoteActionsModel } from '../models/hooks.model';

import uuid from 'react-uuid';

export const useNoteActions = () => {
	const [user] = useAuthState(auth);
	const dispatch = useAppDispatch();

	const { fetchUserData } = useFetchUserData();

	const addNote: UseNoteActionsModel = async (title, note) => {
		try {
			await updateDoc(doc(db, 'users', `${user?.uid}`), {
				notes: arrayUnion({
					id: uuid(),
					title,
					description: note,
					date: Timestamp.fromDate(new Date()).seconds,
				}),
			});
		} catch (err) {
			if (err instanceof Error) {
				dispatch(setErrorValue('Something went wrong.. Refresh!'));
			}
		}
	};

	const deleteNote: UseNoteActionsModel = async (data, id) => {
		if (typeof data === 'object') {
			try {
				await updateDoc(doc(db, 'users', `${user?.uid}`), {
					notes: arrayRemove({ id, ...data }),
				});
				fetchUserData();
			} catch (err) {
				if (err instanceof Error) {
					dispatch(setErrorValue('Something went wrong.. Refresh!'));
				}
			}
		}
	};

	const editNote: UseNoteActionsModel = async (data, note, title, id, date) => {
		if (typeof data === 'object') {
			try {
				await updateDoc(doc(db, 'users', `${user?.uid}`), {
					notes: arrayRemove({ id, ...data }),
				});
				await updateDoc(doc(db, 'users', `${user?.uid}`), {
					notes: arrayUnion({
						id,
						title,
						description: note,
						date,
					}),
				});
				await fetchUserData();
			} catch (err) {
				if (err instanceof Error) {
					dispatch(setErrorValue('Something went wrong.. Refresh!'));
				}
			}
		}
	};

	const deleteAllNotes = async () => {
		try {
			await updateDoc(doc(db, 'users', `${user?.uid}`), {
				notes: [],
			});
			fetchUserData();
		} catch (err) {
			if (err instanceof Error) {
				dispatch(setErrorValue('Something went wrong.. Refresh!'));
			}
		}
	};

	return { addNote, deleteNote, editNote, deleteAllNotes };
};
