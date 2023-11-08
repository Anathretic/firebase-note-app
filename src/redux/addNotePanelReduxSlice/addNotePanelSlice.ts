import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { BooleanReduxState } from '../../models/boolean.model';

const initialState: BooleanReduxState = {
	value: false,
};

const addNotePanelSlice = createSlice({
	name: 'addNote',
	initialState,
	reducers: {
		showPanel: state => {
			state.value = true;
		},
		hidePanel: state => {
			state.value = false;
		},
	},
});

export const { showPanel, hidePanel } = addNotePanelSlice.actions;

export const getInitialAddNotePanelValue = (state: RootState) => state.addNotePanelReduxStore.value;

export default addNotePanelSlice;
