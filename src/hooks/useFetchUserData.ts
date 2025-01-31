import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { auth } from '../firebase/firebaseClient';
import { useAppDispatch } from './reduxHooks';
import { setUserData } from '../redux/userDataReduxSlice/userDataSlice';
import { setErrorValue } from '../redux/errorPopupReduxSlice/errorPopupSlice';

export const useFetchUserData = () => {
	const [user] = useAuthState(auth);
	const dispatch = useAppDispatch();

	const fetchUserData = async () => {
		if (!user?.uid) {
			dispatch(setErrorValue('User is not authenticated.. Refresh!'));
			return;
		}

		await user.reload();

		try {
			const dataQuery = query(collection(db, 'users'), where('uid', '==', user?.uid));
			const getData = await getDocs(dataQuery);
			const userData = getData.docs[0].data();
			dispatch(setUserData(userData.notes));
		} catch (err) {
			if (err instanceof Error) {
				dispatch(setErrorValue('Something went wrong.. Refresh!'));
				console.log(err);
			}
		}
	};

	return [fetchUserData];
};
