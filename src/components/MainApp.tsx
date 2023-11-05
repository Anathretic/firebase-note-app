import { logout } from '../firebase/firebaseClient';
import { useAppDispatch } from '../hooks/reduxHooks';
import { setLogout } from '../redux/loginReduxSlice/loginSlice';
import { clearUserData } from '../redux/userReduxSlice/userSlice';

export const MainApp: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleLogout = () => {
		dispatch(clearUserData());
		dispatch(setLogout());
		logout();
	};

	return (
		<div>
			<p>Your notes will be here!</p>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};
