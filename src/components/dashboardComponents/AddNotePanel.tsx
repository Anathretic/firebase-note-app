import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useAddNote, useEditNote } from '../../hooks/useNote';
import { hidePanel } from '../../redux/addNotePanelReduxSlice/addNotePanelSlice';
import { clearEditData, getInitialEditNoteDataValue } from '../../redux/editNoteDataReduxSlice/editNoteDataSlice';
import { disableEditOption, getInitialEditNoteValue } from '../../redux/editNoteReduxSlice/editNoteSlice';
import { noteSchema } from '../../schemas/schemas';
import { AddNoteInputs } from '../../models/inputs.model';
import { scrollToTop } from '../../utils/scrollToTop';

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

	console.log(editData.date);

	const onSubmit: SubmitHandler<AddNoteInputs> = async ({ title, note }) => {
		if (editOptionsStatus) {
			editNote(editData, note, title, editData.id, editData.date)
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
		<div className='add-note-container'>
			<div className='add-note-container__box white-gradient'>
				<h3 className='add-note-container__title'>{editOptionsStatus ? 'Edit note!' : 'Add note!'}</h3>
				<hr className='add-note-container__strap' />
				<form className='add-note-container__form' onSubmit={handleSubmit(onSubmit)}>
					<div className='add-note-container__form-box'>
						<label className='add-note-container__label' htmlFor='title'>
							Title:
						</label>
						<input
							aria-invalid={errors.title ? true : false}
							className='add-note-container__input'
							type='text'
							id='title'
							placeholder='Enter your title..'
							autoComplete='off'
							defaultValue={editOptionsStatus ? editData.title : ''}
							{...register('title')}
						/>
						<p className='add-note-container__input-error'>{errors.title?.message}</p>
					</div>
					<div className='add-note-container__form-box'>
						<label className='add-note-container__label' htmlFor='note'>
							Note:
						</label>
						<textarea
							aria-invalid={errors.note ? true : false}
							className='add-note-container__textarea'
							id='note'
							placeholder='Enter your note..'
							autoComplete='off'
							defaultValue={editOptionsStatus ? editData.description : ''}
							{...register('note')}></textarea>
						<p className='add-note-container__input-error'>{errors.note?.message}</p>
					</div>
					<div className='add-note-container__button-box'>
						<button className='add-note-container__form-submit' type='submit'>
							{editOptionsStatus ? 'Edit' : 'Add'}
						</button>
						<button className='add-note-container__button' type='button' onClick={handleBack}>
							Back
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
