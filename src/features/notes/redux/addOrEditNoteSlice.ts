import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../shared/redux/store';
import { AddOrEditNoteModel } from '../models/notes.model';

const initialState: AddOrEditNoteModel = {
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

export const getInitialAddOrEditNoteValue = (state: RootState) => state.addOrEditNoteReduxStore.value;

export default addOrEditNoteSlice;
