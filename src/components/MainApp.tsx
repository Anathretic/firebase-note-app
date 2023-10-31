import { useAppDispatch } from '../hooks/reduxHooks';
import { setLogout } from '../redux/loginReduxSlice/loginSlice';

export const MainApp: React.FC = () => {
	const dispatch = useAppDispatch();

	return (
		<div>
			<p>Your notes will be here!</p>
			<button onClick={() => dispatch(setLogout())}>Logout</button>
		</div>
	);
};
