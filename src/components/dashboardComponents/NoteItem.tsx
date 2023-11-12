import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { auth } from '../../firebase/firebaseClient';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useFetchUserData } from '../../hooks/useFetchUserData';
import { useAppSelector } from '../../hooks/reduxHooks';

import { getInitialUserDataValue } from '../../redux/userDataReduxSlice/userDataSlice';

export const NoteItem: React.FC = () => {
	const [user] = useAuthState(auth);
	const [fetchUserData] = useFetchUserData();
	const userDataNotesArray = useAppSelector(state => getInitialUserDataValue(state));

	const deleteNote = async (data: object, id: string) => {
		try {
			await updateDoc(doc(db, 'users', `${user?.uid}`), {
				notes: arrayRemove({ id, ...data }),
			});
			fetchUserData();
		} catch (error: unknown) {
			console.log(error);
		}
	};

	return (
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
	);
};
