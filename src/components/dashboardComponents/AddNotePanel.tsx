import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
	clearAddNoteInputValue,
	getInitialAddNoteInputValue,
	setAddNoteInputValue,
} from '../../redux/addNoteInputReduxSlice/addNoteInputSlice';
import { hidePanel } from '../../redux/addNotePanelReduxSlice/addNotePanelSlice';

export const AddNotePanel: React.FC = () => {
	const noteInput = useAppSelector(state => getInitialAddNoteInputValue(state));
	const dispatch = useAppDispatch();

	const handleNoteInputValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		dispatch(setAddNoteInputValue({ ...noteInput, [e.currentTarget.name]: e.currentTarget.value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		console.log(e);
	};

	const handleBack = () => {
		dispatch(hidePanel());
		dispatch(clearAddNoteInputValue());
	};

	console.log(noteInput);

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
