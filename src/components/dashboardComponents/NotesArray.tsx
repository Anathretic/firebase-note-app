import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebaseClient';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useDeleteNote } from '../../hooks/noteHooks';
import { useRandomGreeting } from '../../hooks/useRandomGreeting';
import { getInitialUserDataValue } from '../../redux/userDataReduxSlice/userDataSlice';
import { getInitialGreetingValue } from '../../redux/randomGreetingReduxSlice/randomGreetingSlice';
import { editNote } from '../../redux/addOrEditNoteReduxSlice/addOrEditNoteSlice';
import { setEditData } from '../../redux/editNoteDataReduxSlice/editNoteDataSlice';
import { scrollToTop } from '../../utils/scrollToTop';
import { TiDeleteOutline, TiPencil } from 'react-icons/ti';

export const NotesArray: React.FC = () => {
	const [user] = useAuthState(auth);
	const [deleteNote] = useDeleteNote();
	const [randomGreeting] = useRandomGreeting();
	const userDataNotesArray = useAppSelector(getInitialUserDataValue);
	const randomGreetingValue = useAppSelector(getInitialGreetingValue);
	const dispatch = useAppDispatch();

	// Shallow copy of userDataNotesArray
	const userData = [...userDataNotesArray];
	// Sorting the data to fool the users in 100% into thinking they are editing a note
	const sortedUserData = userData.sort((a, b) => a.date - b.date);

	const handleEdit = (data: object) => {
		dispatch(editNote());
		dispatch(setEditData(data));
		scrollToTop();
	};

	useEffect(() => {
		randomGreeting();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='notes-array'>
			<div className='notes-array__username'>
				<p>
					{randomGreetingValue}
					{user?.displayName}!
				</p>
			</div>
			<div className='notes-array__container'>
				{sortedUserData.map(data => (
					<div className='notes-array__item white-gradient' key={data.id}>
						<div className='notes-array__header'>
							<h3 className='notes-array__title'>{data.title}</h3>
							<div>
								<button className='notes-array__button' type='button' onClick={() => handleEdit(data)}>
									<TiPencil />
								</button>
								<button className='notes-array__button' type='button' onClick={() => deleteNote(data, data.id)}>
									<TiDeleteOutline />
								</button>
							</div>
						</div>
						<div className='notes-array__text'>{data.description}</div>
					</div>
				))}
			</div>
		</div>
	);
};
