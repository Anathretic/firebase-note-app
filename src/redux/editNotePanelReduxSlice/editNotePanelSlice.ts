import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { BooleanReduxState } from '../../models/boolean.model';

const initialState: BooleanReduxState = {
	value: false,
};

const editNotePanelSlice = createSlice({
	name: 'editNote',
	initialState,
	reducers: {
		showEditPanel: state => {
			state.value = true;
		},
		hideEditPanel: state => {
			state.value = false;
		},
	},
});

export const { showEditPanel, hideEditPanel } = editNotePanelSlice.actions;

export const getInitialEditNotePanelValue = (state: RootState) => state.editNotePanelReduxStore.value;

export default editNotePanelSlice;
