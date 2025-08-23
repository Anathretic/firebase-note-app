import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../shared/firebase/firebaseClient';
import { useNoteActions } from '../../../shared/hooks/useNoteActions';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/reduxHooks';
import { getSortedUserData } from '../../../shared/redux/userDataSlice';
import { editNote } from '../redux/addOrEditNoteSlice';
import { setEditData } from '../../../shared/redux/editNoteDataSlice';
import { NotesArrayModel } from '../models/notes.model';
import { scrollToTop } from '../../../shared/utils/scrollToTop';
import { TiDeleteOutline, TiPencil } from 'react-icons/ti';

const NotesArray: React.FC<NotesArrayModel> = ({ greeting }) => {
	const [user] = useAuthState(auth);
	const sortedUserData = useAppSelector(getSortedUserData);
	const dispatch = useAppDispatch();

	const { deleteNote } = useNoteActions();

	const handleEdit = (data: object) => {
		dispatch(editNote());
		dispatch(setEditData(data));
		scrollToTop();
	};

	return (
		<section className='notes-array'>
			<div className='notes-array__greeting'>
				<h2>
					{greeting}
					{user?.displayName}! It's your dashboard!
				</h2>
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
		</section>
	);
};

export default NotesArray;
