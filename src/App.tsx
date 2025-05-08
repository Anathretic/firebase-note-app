import { lazy, Suspense, useEffect } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseClient';
import { useAppSelector, useAppDispatch } from './hooks/reduxHooks';
import { getInitialLoginValue, setLogin, setLogout } from './redux/authReduxSlice/authSlice';
import { getInitialErrorPopupValue } from './redux/errorPopupReduxSlice/errorPopupSlice';
import {
	AppWrapper,
	ErrorPopup,
	Footer,
	Header,
	Loader,
	LoginAndRegisterPanel,
	PageNotFound,
	ResetPassword,
} from './components';

const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));

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
	}, []);

	return (
		<div className='app'>
			{error && <ErrorPopup />}
			<Routes>
				<Route
					element={
						<>
							<Header />
							<Outlet />
							{!login && <Footer />}
						</>
					}>
					<Route
						path='/'
						element={
							<AppWrapper>
								{!login ? (
									<LoginAndRegisterPanel />
								) : (
									<Suspense fallback={<Loader />}>
										<Dashboard />
									</Suspense>
								)}
							</AppWrapper>
						}
					/>
					<Route path='/forgot-password' element={<ResetPassword />} />
					<Route />
				</Route>
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</div>
	);
};
