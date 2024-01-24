import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useAddNote, useEditNote } from '../../hooks/noteHooks';
import { closeIt, getInitialAddOrEditNoteValue } from '../../redux/addOrEditNoteReduxSlice/addOrEditNoteSlice';
import { clearEditData, getInitialEditNoteDataValue } from '../../redux/editNoteDataReduxSlice/editNoteDataSlice';
import { noteSchema } from '../../schemas/schemas';
import { AddNoteInputs } from '../../models/inputs.model';
import { scrollToTop } from '../../utils/scrollToTop';
import { FormInput, FormTextarea } from '../littleComponents/FormElements';

export const AddOrEditNote: React.FC = () => {
	const [addNote] = useAddNote();
	const [editNote] = useEditNote();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddNoteInputs>({
		resolver: yupResolver(noteSchema),
	});
	const addOrEditNoteStatus = useAppSelector(getInitialAddOrEditNoteValue);
	const editData = useAppSelector(getInitialEditNoteDataValue);
	const dispatch = useAppDispatch();

	const onSubmit: SubmitHandler<AddNoteInputs> = ({ title, note }) => {
		if (addOrEditNoteStatus === 'editNote') {
			editNote(editData, note, title, editData.id, editData.date);
		} else if (addOrEditNoteStatus === 'addNote') {
			addNote(title, note);
		}
		handleBack();
	};

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
				<h3 className='add-or-edit-note__title'>{addOrEditNoteStatus === 'editNote' ? 'Edit note!' : 'Add note!'}</h3>
				<hr className='add-or-edit-note__strap' />
				<form className='form' onSubmit={handleSubmit(onSubmit)}>
					<FormInput
						label='Title:'
						inputName='title'
						type='text'
						placeholder='Enter your title..'
						defaultValue={addOrEditNoteStatus === 'editNote' ? editData.title : ''}
						children={errors.title?.message}
						aria-invalid={errors.title ? true : false}
						{...register('title')}
					/>
					<FormTextarea
						label='Note:'
						inputName='note'
						placeholder='Enter your note..'
						defaultValue={addOrEditNoteStatus === 'editNote' ? editData.description : ''}
						children={errors.note?.message}
						aria-invalid={errors.note ? true : false}
						{...register('note')}
					/>
					<div className='add-or-edit-note__button-box'>
						<input
							className='add-or-edit-note__submit'
							type='submit'
							value={addOrEditNoteStatus === 'editNote' ? 'Edit' : 'Add'}
						/>
						<button className='add-or-edit-note__back-button' type='button' onClick={handleBack}>
							Back
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
