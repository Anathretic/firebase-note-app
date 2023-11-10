import { doc, updateDoc } from 'firebase/firestore';
import { auth, logout } from '../../firebase/firebaseClient';
import { useAppDispatch } from '../../hooks/reduxHooks';

import { showPanel } from '../../redux/addNotePanelReduxSlice/addNotePanelSlice';
import { setLogout } from '../../redux/loginReduxSlice/loginSlice';
import { closeRegister } from '../../redux/registerReduxSlice/registerSlice';
import { clearUserData } from '../../redux/userDataReduxSlice/userDataSlice';
import { db } from '../../firebase/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Header: React.FC = () => {
	const [user] = useAuthState(auth);
	const dispatch = useAppDispatch();

	const deleteAllNotes = async () => {
		try {
			await updateDoc(doc(db, 'users', `${user?.uid}`), {
				notes: [],
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleLogout = () => {
		dispatch(clearUserData());
		dispatch(setLogout());
		dispatch(closeRegister());
		logout();
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
