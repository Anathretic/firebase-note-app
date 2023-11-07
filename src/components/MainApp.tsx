import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { useAuthState } from 'react-firebase-hooks/auth';

import { query, collection, getDocs, where } from 'firebase/firestore';
import { auth, logout } from '../firebase/firebaseClient';
import { db } from '../firebase/firebaseConfig';

import { clearUserData, getInitialUserDataValue, setUserData } from '../redux/userDataReduxSlice/userDataSlice';
import { setLogout } from '../redux/loginReduxSlice/loginSlice';
import { closeRegister } from '../redux/registerReduxSlice/registerSlice';

export const MainApp: React.FC = () => {
	const [user] = useAuthState(auth);
	const userDataNotesArray = useAppSelector(state => getInitialUserDataValue(state));
	const dispatch = useAppDispatch();

	const fetchUserData = async () => {
		try {
			const dataQuery = query(collection(db, 'users'), where('uid', '==', user?.uid));
			const getData = await getDocs(dataQuery);
			const userData = getData.docs[0].data();
			dispatch(setUserData(userData.notes));
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchUserData();
	}, []);

	const handleLogout = () => {
		dispatch(clearUserData());
		dispatch(setLogout());
		dispatch(closeRegister());
		logout();
	};

	return (
		<div>
			<div>
				<p>Hello {user?.email}</p>
			</div>
			<div>
				{userDataNotesArray.map(data => (
					<div key={data.id}>
						<h3>{data.title}</h3>
						<span>{data.description}</span>
					</div>
				))}
			</div>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};
