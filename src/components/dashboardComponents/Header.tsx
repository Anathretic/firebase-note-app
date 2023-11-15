import { doc, updateDoc } from 'firebase/firestore';
import { auth, logoutUser } from '../../firebase/firebaseClient';
import { useAppDispatch } from '../../hooks/reduxHooks';

import { showPanel } from '../../redux/addNotePanelReduxSlice/addNotePanelSlice';
import { setLogout } from '../../redux/loginReduxSlice/loginSlice';
import { closeRegister } from '../../redux/registerReduxSlice/registerSlice';
import { clearUserData } from '../../redux/userDataReduxSlice/userDataSlice';
import { setErrorValue } from '../../redux/errorPopupReduxSlice/errorPopupSlice';

import { db } from '../../firebase/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useFetchUserData } from '../../hooks/useFetchUserData';

export const Header: React.FC = () => {
	const [user] = useAuthState(auth);
	const [fetchUserData] = useFetchUserData();
	const dispatch = useAppDispatch();

	const deleteAllNotes = async () => {
		try {
			await updateDoc(doc(db, 'users', `${user?.uid}`), {
				notes: [],
			});
			fetchUserData();
		} catch (err) {
			if (err instanceof Error) {
				dispatch(setErrorValue('Something went wrong.. Try again later!'));
			}
		}
	};

	const handleLogout = () => {
		dispatch(clearUserData());
		dispatch(setLogout());
		dispatch(closeRegister());
		logoutUser();
	};

	return (
		<div>
			<h1>I'm header!</h1>
			<button type='button' onClick={() => dispatch(showPanel())}>
				+
			</button>
			<button type='button' onClick={deleteAllNotes}>
				Clear
			</button>
			<button type='button' onClick={handleLogout}>
				Logout
			</button>
		</div>
	);
};
