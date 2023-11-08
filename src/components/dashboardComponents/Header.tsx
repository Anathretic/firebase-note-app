import { logout } from '../../firebase/firebaseClient';
import { useAppDispatch } from '../../hooks/reduxHooks';

import { showPanel } from '../../redux/addNotePanelReduxSlice/addNotePanelSlice';
import { setLogout } from '../../redux/loginReduxSlice/loginSlice';
import { closeRegister } from '../../redux/registerReduxSlice/registerSlice';
import { clearUserData } from '../../redux/userDataReduxSlice/userDataSlice';

export const Header: React.FC = () => {
	const dispatch = useAppDispatch();

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
			<button type='button' onClick={handleLogout}>
				Logout
			</button>
		</div>
	);
};
