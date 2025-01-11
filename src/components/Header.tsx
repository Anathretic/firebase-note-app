import { logoutUser } from '../firebase/firebaseClient';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { useDeleteAllNotes } from '../hooks/noteHooks';
import { addNote, getInitialAddOrEditNoteValue } from '../redux/addOrEditNoteReduxSlice/addOrEditNoteSlice';
import { getInitialLoginValue, setLogout } from '../redux/loginReduxSlice/loginSlice';
import { closeRegister } from '../redux/registerReduxSlice/registerSlice';
import { clearUserData } from '../redux/userDataReduxSlice/userDataSlice';
import { scrollToTop } from '../utils/scrollToTop';

import { FaPlus } from 'react-icons/fa6';
import { FaTrashAlt, FaRegStickyNote } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

const Header: React.FC = () => {
	const [deleteAllNotes] = useDeleteAllNotes();
	const loginStatus = useAppSelector(getInitialLoginValue);
	const addOrEditNoteStatus = useAppSelector(getInitialAddOrEditNoteValue);
	const dispatch = useAppDispatch();

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
							{addOrEditNoteStatus === '' && (
								<>
									<button
										className='header__button'
										type='button'
										onClick={() => {
											scrollToTop();
											dispatch(addNote());
										}}>
										<FaPlus className='header__button-icon' />
									</button>
									<button className='header__button' type='button' onClick={deleteAllNotes}>
										<FaTrashAlt className='header__button-icon' />
									</button>
								</>
							)}
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

export default Header;
