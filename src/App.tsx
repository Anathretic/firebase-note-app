import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseClient';
import { useAppSelector, useAppDispatch } from './hooks/reduxHooks';
import { getInitialLoginValue, setLogin, setLogout } from './redux/loginReduxSlice/loginSlice';
import { getInitialErrorPopupValue } from './redux/errorPopupReduxSlice/errorPopupSlice';
import { Dashboard, ErrorPopup, Footer, Header, LoginAndRegisterPanel } from './components';

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
