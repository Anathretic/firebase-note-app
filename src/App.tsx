import { useAppSelector, useAppDispatch } from './hooks/reduxHooks';
import { getInitialLoginValue, setLogin, setLogout } from './redux/loginReduxSlice/loginSlice';

export const App: React.FC = () => {
	const login = useAppSelector(state => getInitialLoginValue(state));
	const dispatch = useAppDispatch();

	return (
		<>
			{login ? (
				<button onClick={() => dispatch(setLogout())}>Logout</button>
			) : (
				<div>
					<p>Hello!</p>
					<strong>World!</strong>
					<button onClick={() => dispatch(setLogin())}>Login</button>
				</div>
			)}
		</>
	);
};
