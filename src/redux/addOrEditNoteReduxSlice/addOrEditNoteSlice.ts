import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type Status = 'addNote' | 'editNote' | '';

interface AddOrEdit {
	value: Status;
}

const initialState: AddOrEdit = {
	value: '',
};

const addOrEditNoteSlice = createSlice({
	name: 'addOrEditNote',
	initialState,
	reducers: {
		addNote: state => {
			state.value = 'addNote';
		},
		editNote: state => {
			state.value = 'editNote';
		},
		closeIt: state => {
			state.value = '';
		},
	},
});

export const { addNote, editNote, closeIt } = addOrEditNoteSlice.actions;

export const getInitialAddOrEditNoteValue = (state: RootState) => state.addOrEditNoteReduxStore.value

export default addOrEditNoteSlice;
