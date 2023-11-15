import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Error {
	value: string;
}

const initialState: Error = {
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
