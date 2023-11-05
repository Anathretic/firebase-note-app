import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase/firebaseConfig';

import { LoginAndRegisterPanel } from './components/LoginAndRegisterPanel';
import { MainApp } from './components/MainApp';

import { useAppSelector, useAppDispatch } from './hooks/reduxHooks';
import { getInitialLoginValue, setLogin, setLogout } from './redux/loginReduxSlice/loginSlice';
import { setUserData, clearUserData } from './redux/userReduxSlice/userSlice';

export const App: React.FC = () => {
	const login = useAppSelector(state => getInitialLoginValue(state));
	const dispatch = useAppDispatch();

	useEffect(() => {
		const auth = getAuth(app);
		const unsubscribe = onAuthStateChanged(auth, user => {
			if (user !== null) {
				const uid = user.uid;
				dispatch(setUserData(user));
				dispatch(setLogin());
				console.log(user, uid);
			} else {
				dispatch(clearUserData());
				dispatch(setLogout());
			}
		});
		return () => unsubscribe();
	}, []);

	return <div>{!login ? <LoginAndRegisterPanel /> : <MainApp />}</div>;
};
