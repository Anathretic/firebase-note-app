import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseClient';

import { Header } from './components/Header';
import { LoginAndRegisterPanel } from './components/LoginAndRegisterPanel';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';

import { useAppSelector, useAppDispatch } from './hooks/reduxHooks';
import { getInitialLoginValue, setLogin, setLogout } from './redux/loginReduxSlice/loginSlice';
import { getInitialErrorPopupValue } from './redux/errorPopupReduxSlice/errorPopupSlice';
import { ErrorPopup } from './components/littleComponents/ErrorPopup';

export const App: React.FC = () => {
	const login = useAppSelector(getInitialLoginValue);
	const error = useAppSelector(getInitialErrorPopupValue);
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
			{error && <ErrorPopup />}
			<Header />
			<main className='app-container'>{!login ? <LoginAndRegisterPanel /> : <Dashboard />}</main>
			{!login && <Footer />}
		</div>
	);
};
