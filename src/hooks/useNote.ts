import { useAuthState } from 'react-firebase-hooks/auth';
import { Timestamp, arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { auth } from '../firebase/firebaseClient';
import { useFetchUserData } from './useFetchUserData';
import { useAppDispatch } from './reduxHooks';
import { setErrorValue } from '../redux/errorPopupReduxSlice/errorPopupSlice';

import uuid from 'react-uuid';

type UseNote = (arg1: string | object, arg2: string, arg3?: string, arg4?: string, arg5?: number) => Promise<void>;

export const useAddNote = () => {
	const [user] = useAuthState(auth);
	const dispatch = useAppDispatch();

	const addNote: UseNote = async (title, note) => {
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

	return [addNote];
};

export const useDeleteNote = () => {
	const [user] = useAuthState(auth);
	const [fetchUserData] = useFetchUserData();
	const dispatch = useAppDispatch();

	const deleteNote: UseNote = async (data, id) => {
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

	return [deleteNote];
};

export const useEditNote = () => {
	const [user] = useAuthState(auth);
	const [fetchUserData] = useFetchUserData();
	const dispatch = useAppDispatch();

	const editNote: UseNote = async (data, note, title, id, date) => {
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

	return [editNote];
};
