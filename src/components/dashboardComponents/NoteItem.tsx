import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { auth } from '../../firebase/firebaseClient';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useFetchUserData } from '../../hooks/useFetchUserData';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

import { getInitialUserDataValue } from '../../redux/userDataReduxSlice/userDataSlice';
import { setErrorValue } from '../../redux/errorPopupReduxSlice/errorPopupSlice';

export const NoteItem: React.FC = () => {
	const [user] = useAuthState(auth);
	const [fetchUserData] = useFetchUserData();
	const userDataNotesArray = useAppSelector(state => getInitialUserDataValue(state));
	const dispatch = useAppDispatch();

	const deleteNote = async (data: object, id: string) => {
		try {
			await updateDoc(doc(db, 'users', `${user?.uid}`), {
				notes: arrayRemove({ id, ...data }),
			});
			fetchUserData();
		} catch (err) {
			if (err instanceof Error) {
				dispatch(setErrorValue('Something went wrong.. Try again later!'));
			}
		}
	};

	return (
		<>
			<div>
				<p>Hello {user?.displayName}!</p>
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
	);
};
