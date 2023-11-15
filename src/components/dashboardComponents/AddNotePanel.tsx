import { useAppDispatch } from '../../hooks/reduxHooks';
import { hidePanel } from '../../redux/addNotePanelReduxSlice/addNotePanelSlice';
import { setErrorValue } from '../../redux/errorPopupReduxSlice/errorPopupSlice';

import uuid from 'react-uuid';
import { noteSchema } from '../../schemas/schemas';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebaseClient';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddNoteInputs } from '../../models/inputs.model';

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
			dispatch(hidePanel());
		} catch (err) {
			if (err instanceof Error) {
				dispatch(setErrorValue('Something went wrong.. Try again later!'));
			}
		}
	};

	const handleBack = () => {
		dispatch(hidePanel());
	};

	return (
		<div>
			<h3>I'm adding your notes!</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor='title'>Title:</label>
				<input type='text' id='title' placeholder='Enter your title..' autoComplete='off' {...register('title')} />
				<p>{errors.title?.message}</p>
				<label htmlFor='note'>Note:</label>
				<textarea id='note' placeholder='Enter your note..' autoComplete='off' {...register('note')}></textarea>
				<p>{errors.note?.message}</p>
				<button type='submit'>Add it!</button>
				<button type='button' onClick={handleBack}>
					Go back
				</button>
			</form>
		</div>
	);
};
