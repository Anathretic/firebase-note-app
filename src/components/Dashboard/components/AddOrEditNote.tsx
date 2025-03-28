import { useAppSelector } from '../../../hooks/reduxHooks';
import { getInitialAddOrEditNoteValue } from '../../../redux/addOrEditNoteReduxSlice/addOrEditNoteSlice';
import { AddOrEditNoteForm } from '../../Forms/AddOrEditNoteForm';

const AddOrEditNote: React.FC = () => {
	const addOrEditNoteStatus = useAppSelector(getInitialAddOrEditNoteValue);

	return (
		<div className='add-or-edit-note'>
			<div className='add-or-edit-note__container white-gradient'>
				<h2 className='add-or-edit-note__title'>{addOrEditNoteStatus === 'editNote' ? 'Edit note!' : 'Add note!'}</h2>
				<hr className='add-or-edit-note__strap' />
				<AddOrEditNoteForm />
			</div>
		</div>
	);
};

export default AddOrEditNote;
