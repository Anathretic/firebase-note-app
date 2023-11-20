import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseClient';

import { Header } from './components/Header';
import { LoginAndRegisterPanel } from './components/LoginAndRegisterPanel';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';

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
		<div className={`app ${error && 'scroll-block'}`}>
			{error && (
				<div className='error-popup--shadow'>
					<div className='error-popup--box white-gradient'>
						<p className='error-popup--message'>{error}</p>
						<button className='error-popup--button' type='button' onClick={() => dispatch(clearErrorValue())}>
							Try again
						</button>
					</div>
				</div>
			)}
			<Header />
			<main className='app-container'>{!login ? <LoginAndRegisterPanel /> : <Dashboard />}</main>
			{!login && <Footer />}
		</div>
	);
};
