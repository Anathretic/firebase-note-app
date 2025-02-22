import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/firebaseClient';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { useDeleteNote } from '../../../hooks/noteHooks';
import { getSortedUserData } from '../../../redux/userDataReduxSlice/userDataSlice';
import { editNote } from '../../../redux/addOrEditNoteReduxSlice/addOrEditNoteSlice';
import { setEditData } from '../../../redux/editNoteDataReduxSlice/editNoteDataSlice';
import { NotesArrayComponentModel } from '../../../models/notesArray.model';
import { scrollToTop } from '../../../utils/scrollToTop';
import { TiDeleteOutline, TiPencil } from 'react-icons/ti';

const NotesArray: React.FC<NotesArrayComponentModel> = ({ greeting }) => {
	const [user] = useAuthState(auth);
	const [deleteNote] = useDeleteNote();
	const sortedUserData = useAppSelector(getSortedUserData);
	const dispatch = useAppDispatch();

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
