import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { closeIt, getInitialAddOrEditNoteValue } from '../../../redux/addOrEditNoteReduxSlice/addOrEditNoteSlice';
import { clearEditData } from '../../../redux/editNoteDataReduxSlice/editNoteDataSlice';
import { scrollToTop } from '../../../utils/scrollToTop';
import { AddOrEditNoteForm } from '../../Forms/AddOrEditNoteForm';

const AddOrEditNote: React.FC = () => {
	const addOrEditNoteStatus = useAppSelector(getInitialAddOrEditNoteValue);
	const dispatch = useAppDispatch();

	const handleBack = () => {
		scrollToTop();
		dispatch(closeIt());
		if (addOrEditNoteStatus === 'editNote') {
			dispatch(clearEditData());
		}
	};

	return (
		<div className='add-or-edit-note'>
			<div className='add-or-edit-note__container white-gradient'>
				<h2 className='add-or-edit-note__title'>{addOrEditNoteStatus === 'editNote' ? 'Edit note!' : 'Add note!'}</h2>
				<hr className='add-or-edit-note__strap' />
				<AddOrEditNoteForm handleBack={handleBack} />
			</div>
		</div>
	);
};

export default AddOrEditNote;
