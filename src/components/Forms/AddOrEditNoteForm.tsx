import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useAddNote, useEditNote } from '../../hooks/noteHooks';
import { getInitialAddOrEditNoteValue } from '../../redux/addOrEditNoteReduxSlice/addOrEditNoteSlice';
import { getInitialEditNoteDataValue } from '../../redux/editNoteDataReduxSlice/editNoteDataSlice';
import { noteSchema } from '../../schemas/schemas';
import { AddOrEditNoteComponentModel, AddOrEditNoteFormModel } from '../../models/forms.model';
import { FormInput, FormTextarea } from './components/FormElements';

export const AddOrEditNoteForm: React.FC<AddOrEditNoteComponentModel> = ({ handleBack }) => {
	const [addNote] = useAddNote();
	const [editNote] = useEditNote();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddOrEditNoteFormModel>({
		resolver: yupResolver(noteSchema),
	});
	const addOrEditNoteStatus = useAppSelector(getInitialAddOrEditNoteValue);
	const editData = useAppSelector(getInitialEditNoteDataValue);

	const onSubmit: SubmitHandler<AddOrEditNoteFormModel> = ({ title, note }) => {
		if (addOrEditNoteStatus === 'editNote') {
			editNote(editData, note, title, editData.id, editData.date);
		} else if (addOrEditNoteStatus === 'addNote') {
			addNote(title, note);
		}
		handleBack();
	};

	return (
		<form className='form' onSubmit={handleSubmit(onSubmit)}>
			<FormInput
				label='Title:'
				inputName='title'
				type='text'
				placeholder='Enter your title..'
				defaultValue={addOrEditNoteStatus === 'editNote' ? editData.title : ''}
				errorMessage={errors.title?.message}
				aria-invalid={errors.title ? true : false}
				{...register('title')}
			/>
			<FormTextarea
				label='Note:'
				inputName='note'
				placeholder='Enter your note..'
				defaultValue={addOrEditNoteStatus === 'editNote' ? editData.description : ''}
				errorMessage={errors.note?.message}
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
	);
};
