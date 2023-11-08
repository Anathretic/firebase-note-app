import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface InputValue {
	title: string;
	note: string;
}

const initialState: InputValue = {
	title: '',
	note: '',
};

const addNoteInputSlice = createSlice({
	name: 'addNoteInput',
	initialState,
	reducers: {
		setAddNoteInputValue: (state, action) => {
			state.title = action.payload.title;
			state.note = action.payload.note;
		},
		clearAddNoteInputValue: state => {
			state.title = '';
			state.note = '';
		},
	},
});

export const { setAddNoteInputValue, clearAddNoteInputValue } = addNoteInputSlice.actions;

export const getInitialAddNoteInputValue = (state: RootState) => state.addNoteInputReduxStore;

export default addNoteInputSlice;
