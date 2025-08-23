import { lazy, Suspense, useEffect } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../shared/firebase/firebaseClient';
import { useAppDispatch, useAppSelector } from '../shared/hooks/reduxHooks';
import { getInitialLoginValue, setLogin, setLogout } from '../features/auth/redux/authSlice';
import { getInitialErrorPopupValue } from '../features/error-popup/redux/errorPopupSlice';
import Header from '../shared/components/Header/Header';
import Footer from '../shared/components/Footer/Footer';
import AppWrapper from '../shared/layout/AppWrapper/AppWrapper';
import LoginAndRegisterPanel from '../features/auth/components/LoginAndRegisterPanel';
import Loader from '../shared/components/Loader/Loader';
import ResetPassword from '../features/auth/components/ResetPassword';
import PageNotFound from '../shared/components/PageNotFound/PageNotFound';
import ErrorPopup from '../features/error-popup/ErrorPopup';

const Dashboard = lazy(() => import('../features/dashboard/Dashboard'));

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
