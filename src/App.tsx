import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseClient';

import { LoginAndRegisterPanel } from './components/LoginAndRegisterPanel';
import { Dashboard } from './components/Dashboard';

import { useAppSelector, useAppDispatch } from './hooks/reduxHooks';
import { getInitialLoginValue, setLogin, setLogout } from './redux/loginReduxSlice/loginSlice';
import { clearErrorValue, getInitialErrorPopupValue } from './redux/errorPopupReduxSlice/errorPopupSlice';

export const App: React.FC = () => {
	const login = useAppSelector(state => getInitialLoginValue(state));
	const error = useAppSelector(state => getInitialErrorPopupValue(state));
	const dispatch = useAppDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			if (user !== null) {
				dispatch(setLogin());
			} else {
				dispatch(setLogout());
			}
		});
		return () => unsubscribe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			{error && (
				<div>
					<div>
						<p>{error}</p>
						<button type='button' onClick={() => dispatch(clearErrorValue())}>
							x
						</button>
					</div>
				</div>
			)}
			<div>{!login ? <LoginAndRegisterPanel /> : <Dashboard />}</div>
		</div>
	);
};
