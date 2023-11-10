import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { useAuthState } from 'react-firebase-hooks/auth';

import { query, collection, getDocs, where, updateDoc, doc, arrayRemove } from 'firebase/firestore';
import { auth } from '../firebase/firebaseClient';
import { db } from '../firebase/firebaseConfig';

import { getInitialUserDataValue, setUserData } from '../redux/userDataReduxSlice/userDataSlice';
import { getInitialAddNotePanelValue } from '../redux/addNotePanelReduxSlice/addNotePanelSlice';

import { Header } from './dashboardComponents/Header';
import { AddNotePanel } from './dashboardComponents/AddNotePanel';

export const Dashboard: React.FC = () => {
	const [user] = useAuthState(auth);
	const userDataNotesArray = useAppSelector(state => getInitialUserDataValue(state));
	const addNotePanelStatus = useAppSelector(state => getInitialAddNotePanelValue(state));
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const deleteNote = async (data: object, id: string) => {
		try {
			await updateDoc(doc(db, 'users', `${user?.uid}`), {
				notes: arrayRemove({ id, ...data }),
			});
		} catch (error: unknown) {
			console.log(error);
		}
	};

	return (
		<div>
			<Header />
			<div>
				{addNotePanelStatus ? (
					<AddNotePanel />
				) : (
					<>
						<div>
							<p>Hello {user?.email}</p>
						</div>
						<div>
							{userDataNotesArray.map(data => (
								<div key={data.id}>
									<button type='button' onClick={() => deleteNote(data, data.id)}>
										X
									</button>
									<h3>{data.title}</h3>
									<span>{data.description}</span>
								</div>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
};
