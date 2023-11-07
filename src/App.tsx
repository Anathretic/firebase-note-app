import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseClient';

import { LoginAndRegisterPanel } from './components/LoginAndRegisterPanel';
import { MainApp } from './components/MainApp';

import { useAppSelector, useAppDispatch } from './hooks/reduxHooks';
import { getInitialLoginValue, setLogin, setLogout } from './redux/loginReduxSlice/loginSlice';

export const App: React.FC = () => {
	const login = useAppSelector(state => getInitialLoginValue(state));
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
	}, []);

	return <div>{!login ? <LoginAndRegisterPanel /> : <MainApp />}</div>;
};
