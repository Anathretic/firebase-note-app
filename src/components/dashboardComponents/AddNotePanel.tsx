import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { auth } from '../../firebase/firebaseClient';
import { db } from '../../firebase/firebaseConfig';

import { useAppDispatch } from '../../hooks/reduxHooks';
import { hidePanel } from '../../redux/addNotePanelReduxSlice/addNotePanelSlice';
import { setErrorValue } from '../../redux/errorPopupReduxSlice/errorPopupSlice';
import { noteSchema } from '../../schemas/schemas';
import { AddNoteInputs } from '../../models/inputs.model';
import { scrollToTop } from '../../utils/scrollToTop';

import uuid from 'react-uuid';

export const AddNotePanel: React.FC = () => {
	const [user] = useAuthState(auth);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddNoteInputs>({
		resolver: yupResolver(noteSchema),
	});
	const dispatch = useAppDispatch();

	const onSubmit: SubmitHandler<AddNoteInputs> = async ({ note, title }) => {
		try {
			await updateDoc(doc(db, 'users', `${user?.uid}`), {
				notes: arrayUnion({
					id: uuid(),
					title: title,
					description: note,
				}),
			});
			handleBack();
		} catch (err) {
			if (err instanceof Error) {
				dispatch(setErrorValue('Something went wrong.. Refresh!'));
			}
		}
	};

	const handleBack = () => {
		scrollToTop();
		dispatch(hidePanel());
	};

	return (
		<div className='add-note-container'>
			<div className='add-note-container__box white-gradient'>
				<h3 className='add-note-container__title'>Add note!</h3>
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
							{...register('note')}></textarea>
						<p className='add-note-container__input-error'>{errors.note?.message}</p>
					</div>
					<div className='add-note-container__button-box'>
						<button className='add-note-container__form-submit' type='submit'>
							Add
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
