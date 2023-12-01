import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { BooleanReduxState } from '../../models/boolean.model';

const initialState: BooleanReduxState = {
	value: false,
};

const editNoteSlice = createSlice({
	name: 'editNotePanel',
	initialState,
	reducers: {
		enableEditOption: state => {
			state.value = true;
		},
		disableEditOption: state => {
			state.value = false;
		},
	},
});

export const { enableEditOption, disableEditOption } = editNoteSlice.actions;

export const getInitialEditNoteValue = (state: RootState) => state.editNoteReduxStore.value;

export default editNoteSlice;
