import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFormSubmits } from '../../../shared/hooks/useFormSubmits';
import { useHandleBack } from '../../../shared/hooks/useHandleBack';
import { useAppSelector } from '../../../shared/hooks/reduxHooks';
import { getInitialEditNoteDataValue } from '../../../shared/redux/editNoteDataSlice';
import { getInitialAddOrEditNoteValue } from '../redux/addOrEditNoteSlice';
import { noteSchema } from '../../../schemas/schemas';
import { AddOrEditNoteFormModel } from '../../../shared/models/forms.model';
import { FormInput, FormTextarea } from '../../../shared/components/FormElements/FormElements';

export const AddOrEditNoteForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddOrEditNoteFormModel>({
		resolver: yupResolver(noteSchema),
	});

	const addOrEditNoteStatus = useAppSelector(getInitialAddOrEditNoteValue);
	const editData = useAppSelector(getInitialEditNoteDataValue);

	const { handleBack } = useHandleBack();
	const { addOrEditNoteSubmit } = useFormSubmits<AddOrEditNoteFormModel>({});

	return (
		<form className='form' onSubmit={handleSubmit(addOrEditNoteSubmit)}>
			<FormInput
				label='Title:'
				inputName='title'
				type='text'
				placeholder='Enter your title'
				defaultValue={addOrEditNoteStatus === 'editNote' ? editData.title : ''}
				errorMessage={errors.title?.message}
				aria-invalid={errors.title ? true : false}
				{...register('title')}
			/>
			<FormTextarea
				label='Note:'
				inputName='note'
				placeholder='Enter your note'
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
