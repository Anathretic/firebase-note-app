import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ErrorPopupModel } from '../../models/reduxSlices.model';

const initialState: ErrorPopupModel = {
	value: '',
};

const errorPopupSlice = createSlice({
	name: 'error',
	initialState,
	reducers: {
		setErrorValue: (state, action) => {
			state.value = action.payload;
		},
		clearErrorValue: state => {
			state.value = '';
		},
	},
});

export const { setErrorValue, clearErrorValue } = errorPopupSlice.actions;

export const getInitialErrorPopupValue = (state: RootState) => state.errorPopupReduxStore.value;

export default errorPopupSlice;
