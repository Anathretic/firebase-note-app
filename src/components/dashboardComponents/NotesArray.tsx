import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { auth } from '../../firebase/firebaseClient';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useFetchUserData } from '../../hooks/useFetchUserData';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

import { getInitialUserDataValue } from '../../redux/userDataReduxSlice/userDataSlice';
import { setErrorValue } from '../../redux/errorPopupReduxSlice/errorPopupSlice';

import { TiDeleteOutline } from "react-icons/ti";

export const NotesArray: React.FC = () => {
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
		<div className='notes-array--container'>
			{userDataNotesArray.map(data => (
				<div className='notes-array--item white-gradient' key={data.id}>
					<div className='notes-array--header'>
						<h3 className='notes-array--title'>{data.title}</h3>
						<button className='notes-array--button' type='button' onClick={() => deleteNote(data, data.id)}>
							<TiDeleteOutline />
						</button>
					</div>
					<div className='notes-array--text'>{data.description}</div>
				</div>
			))}
		</div>
	);
};
