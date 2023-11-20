import { useAuthState } from 'react-firebase-hooks/auth';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { auth } from '../../firebase/firebaseClient';
import { db } from '../../firebase/firebaseConfig';

import { useFetchUserData } from '../../hooks/useFetchUserData';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

import { getInitialUserDataValue } from '../../redux/userDataReduxSlice/userDataSlice';
import { setErrorValue } from '../../redux/errorPopupReduxSlice/errorPopupSlice';

import { TiDeleteOutline } from 'react-icons/ti';

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
				dispatch(setErrorValue('Something went wrong.. Refresh!'));
			}
		}
	};

	return (
		<div className='notes-array'>
			<div className='notes-array__username'>
				<p>{user?.displayName}</p>
			</div>
			<div className='notes-array__container'>
				{userDataNotesArray.map(data => (
					<div className='notes-array__item white-gradient' key={data.id}>
						<div className='notes-array__header'>
							<h3 className='notes-array__title'>{data.title}</h3>
							<button className='notes-array__button' type='button' onClick={() => deleteNote(data, data.id)}>
								<TiDeleteOutline />
							</button>
						</div>
						<div className='notes-array__text'>{data.description}</div>
					</div>
				))}
			</div>
		</div>
	);
};
