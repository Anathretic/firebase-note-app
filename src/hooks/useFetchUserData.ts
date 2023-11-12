import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { auth } from '../firebase/firebaseClient';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useAppDispatch } from './reduxHooks';

import { setUserData } from '../redux/userDataReduxSlice/userDataSlice';

export const useFetchUserData = () => {
	const [user] = useAuthState(auth);
	const dispatch = useAppDispatch();

	const fetchUserData = async () => {
		try {
			const dataQuery = query(collection(db, 'users'), where('uid', '==', user?.uid));
			const getData = await getDocs(dataQuery);
			const userData = getData.docs[0].data();
			dispatch(setUserData(userData.notes));
		} catch (err) {
			console.log(err);
		}
	};

	return [fetchUserData];
};
