import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
	clearAddNoteInputValue,
	getInitialAddNoteInputValue,
	setAddNoteInputValue,
} from '../../redux/addNoteInputReduxSlice/addNoteInputSlice';
import { hidePanel } from '../../redux/addNotePanelReduxSlice/addNotePanelSlice';

import uuid from 'react-uuid';
import { noteSchema } from '../../schemas/schemas';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebaseClient';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

import * as yup from 'yup';

export const AddNotePanel: React.FC = () => {
	const [user] = useAuthState(auth);
	const noteInput = useAppSelector(state => getInitialAddNoteInputValue(state));
	const dispatch = useAppDispatch();

	const handleNoteInputValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		dispatch(setAddNoteInputValue({ ...noteInput, [e.currentTarget.name]: e.currentTarget.value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const { note, title } = await noteSchema.validate(noteInput);

			await updateDoc(doc(db, 'users', `${user?.uid}`), {
				notes: arrayUnion({
					id: uuid(),
					title: title,
					description: note,
				}),
			});

			dispatch(hidePanel());
			dispatch(clearAddNoteInputValue());
		} catch (error: unknown) {
			if (error instanceof yup.ValidationError) {
				console.log(`Pole: ${error.path}, błąd: ${error.message} `);
			} else {
				console.log(error);
			}
		}
	};

	const handleBack = () => {
		dispatch(hidePanel());
		dispatch(clearAddNoteInputValue());
	};

	return (
		<div>
			<h3>I'm adding your notes!</h3>
			<form onSubmit={handleSubmit}>
				<label htmlFor='title'>Title:</label>
				<input
					type='text'
					name='title'
					id='title'
					value={noteInput.title}
					placeholder='Enter your title..'
					autoComplete='off'
					onChange={handleNoteInputValue}
				/>
				<label htmlFor='note'>Note:</label>
				<textarea
					name='note'
					id='note'
					value={noteInput.note}
					placeholder='Enter your note..'
					autoComplete='off'
					onChange={handleNoteInputValue}></textarea>
				<button type='submit'>Add it!</button>
				<button type='button' onClick={handleBack}>
					Go back
				</button>
			</form>
		</div>
	);
};
