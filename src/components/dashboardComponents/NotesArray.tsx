import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebaseClient';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useDeleteNote } from '../../hooks/useNote';
import { getInitialUserDataValue } from '../../redux/userDataReduxSlice/userDataSlice';
import { showPanel } from '../../redux/addNotePanelReduxSlice/addNotePanelSlice';
import { setEditData } from '../../redux/editNoteDataReduxSlice/editNoteDataSlice';
import { enableEditOption } from '../../redux/editNoteReduxSlice/editNoteSlice';
import { TiDeleteOutline, TiPencil } from 'react-icons/ti';

export const NotesArray: React.FC = () => {
	const [user] = useAuthState(auth);
	const [deleteNote] = useDeleteNote();
	const userDataNotesArray = useAppSelector(getInitialUserDataValue);
	const dispatch = useAppDispatch();

	const handleEdit = (data: object) => {
		dispatch(enableEditOption());
		dispatch(setEditData(data));
		dispatch(showPanel());
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
