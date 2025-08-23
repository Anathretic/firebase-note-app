import { logoutUser } from '../../firebase/firebaseClient';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useNoteActions } from '../../hooks/useNoteActions';
import { addNote, getInitialAddOrEditNoteValue } from '../../../features/notes/redux/addOrEditNoteSlice';
import { clearUserData } from '../../redux/userDataSlice';
import { closeRegister, getInitialLoginValue, setLogout } from '../../../features/auth/redux/authSlice';
import { scrollToTop } from '../../utils/scrollToTop';
import { FaPlus } from 'react-icons/fa6';
import { FaTrashAlt, FaRegStickyNote } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

const Header: React.FC = () => {
	const loginStatus = useAppSelector(getInitialLoginValue);
	const addOrEditNoteStatus = useAppSelector(getInitialAddOrEditNoteValue);
	const dispatch = useAppDispatch();

	const { deleteAllNotes } = useNoteActions();

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
