import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, logoutUser } from '../firebase/firebaseClient';
import { db } from '../firebase/firebaseConfig';

import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { useFetchUserData } from '../hooks/useFetchUserData';
import { showPanel } from '../redux/addNotePanelReduxSlice/addNotePanelSlice';
import { getInitialLoginValue, setLogout } from '../redux/loginReduxSlice/loginSlice';
import { closeRegister } from '../redux/registerReduxSlice/registerSlice';
import { clearUserData } from '../redux/userDataReduxSlice/userDataSlice';
import { setErrorValue } from '../redux/errorPopupReduxSlice/errorPopupSlice';
import { scrollToTop } from '../utils/scrollToTop';

import { FaPlus } from 'react-icons/fa6';
import { FaTrashAlt, FaRegStickyNote } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

export const Header: React.FC = () => {
	const [user] = useAuthState(auth);
	const [fetchUserData] = useFetchUserData();
	const loginStatus = useAppSelector(getInitialLoginValue);
	const dispatch = useAppDispatch();

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

	const handleLogout = () => {
		dispatch(clearUserData());
		dispatch(setLogout());
		dispatch(closeRegister());
		scrollToTop();
		logoutUser();
	};

	return (
		<header className='header'>
			<div className='header__box'>
				<h1 className='header__title'>
					<FaRegStickyNote className='header__title-icon' /> NoteApp
				</h1>
				<div className='header__button-container'>
					{loginStatus && (
						<>
							<button
								className='header__button'
								type='button'
								onClick={() => {
									scrollToTop();
									dispatch(showPanel());
								}}>
								<FaPlus className='header__button-icon' />
							</button>
							<button className='header__button' type='button' onClick={deleteAllNotes}>
								<FaTrashAlt className='header__button-icon' />
							</button>
							<button className='header__button' type='button' onClick={handleLogout}>
								<FiLogOut className='header__button-icon' />
							</button>
						</>
					)}
				</div>
			</div>
		</header>
	);
};
