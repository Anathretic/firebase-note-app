import { doc, updateDoc } from 'firebase/firestore';
import { auth, logoutUser } from '../firebase/firebaseClient';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';

import { showPanel } from '../redux/addNotePanelReduxSlice/addNotePanelSlice';
import { getInitialLoginValue, setLogout } from '../redux/loginReduxSlice/loginSlice';
import { closeRegister } from '../redux/registerReduxSlice/registerSlice';
import { clearUserData } from '../redux/userDataReduxSlice/userDataSlice';
import { setErrorValue } from '../redux/errorPopupReduxSlice/errorPopupSlice';

import { db } from '../firebase/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useFetchUserData } from '../hooks/useFetchUserData';

import { FaPlus } from 'react-icons/fa6';
import { FaTrashAlt, FaRegStickyNote } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { scrollToTop } from '../utils/scrollToTop';

export const Header: React.FC = () => {
	const [user] = useAuthState(auth);
	const [fetchUserData] = useFetchUserData();
	const loginStatus = useAppSelector(state => getInitialLoginValue(state));
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
		scrollToTop();
		logoutUser();
	};

	return (
		<div className='header'>
			<div className='header-box'>
				<h1 className='header--title'>
					<FaRegStickyNote className='header--title-icon' /> NoteApp
				</h1>
				<div className='header--button-container'>
					{loginStatus && (
						<>
							<button
								className='header--button'
								type='button'
								onClick={() => {
									scrollToTop();
									dispatch(showPanel());
								}}>
								<FaPlus className='header--button-icon' />
							</button>
							<button className='header--button' type='button' onClick={deleteAllNotes}>
								<FaTrashAlt className='header--button-icon' />
							</button>
							<button className='header--button' type='button' onClick={handleLogout}>
								<FiLogOut className='header--button-icon' />
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
