import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useAddNote, useEditNote } from '../../hooks/noteHooks';
import { hidePanel } from '../../redux/addNotePanelReduxSlice/addNotePanelSlice';
import { clearEditData, getInitialEditNoteDataValue } from '../../redux/editNoteDataReduxSlice/editNoteDataSlice';
import { disableEditOption, getInitialEditNoteValue } from '../../redux/editNoteReduxSlice/editNoteSlice';
import { noteSchema } from '../../schemas/schemas';
import { AddNoteInputs } from '../../models/inputs.model';
import { scrollToTop } from '../../utils/scrollToTop';
import { FormInput, FormTextarea } from '../littleComponents/FormElements';

export const AddNotePanel: React.FC = () => {
	const [addNote] = useAddNote();
	const [editNote] = useEditNote();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddNoteInputs>({
		resolver: yupResolver(noteSchema),
	});
	const editOptionsStatus = useAppSelector(getInitialEditNoteValue);
	const editData = useAppSelector(getInitialEditNoteDataValue);
	const dispatch = useAppDispatch();

	const onSubmit: SubmitHandler<AddNoteInputs> = ({ title, note }) => {
		if (editOptionsStatus) {
			editNote(editData, note, title, editData.id, editData.date);
		} else {
			addNote(title, note);
		}
		handleBack();
	};

	const handleBack = () => {
		scrollToTop();
		dispatch(hidePanel());
		if (editOptionsStatus) {
			dispatch(clearEditData());
			dispatch(disableEditOption());
		}
	};

	return (
		<div className='add-note'>
			<div className='add-note__container white-gradient'>
				<h3 className='add-note__title'>{editOptionsStatus ? 'Edit note!' : 'Add note!'}</h3>
				<hr className='add-note__strap' />
				<form className='form' onSubmit={handleSubmit(onSubmit)}>
					<FormInput
						label='Title:'
						inputName='title'
						type='text'
						placeholder='Enter your title..'
						defaultValue={editOptionsStatus ? editData.title : ''}
						children={errors.title?.message}
						aria-invalid={errors.title ? true : false}
						{...register('title')}
					/>
					<FormTextarea
						label='Note:'
						inputName='note'
						placeholder='Enter your note..'
						defaultValue={editOptionsStatus ? editData.description : ''}
						children={errors.note?.message}
						aria-invalid={errors.note ? true : false}
						{...register('note')}
					/>
					<div className='add-note__button-box'>
						<input className='add-note__submit' type='submit' value={editOptionsStatus ? 'Edit' : 'Add'} />
						<button className='add-note__back-button' type='button' onClick={handleBack}>
							Back
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
