import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Inputs {
	email: string;
	password: string;
	confirmPassword: string;
}

const initialState: Inputs = {
	email: '',
	password: '',
	confirmPassword: '',
};

const inputSlice = createSlice({
	name: 'input',
	initialState,
	reducers: {
		setInputValue: (state, action) => {
			state.email = action.payload.email;
			state.password = action.payload.password;
			state.confirmPassword = action.payload.confirmPassword;
		},
		clearInputValue: state => {
			state.email = '';
			state.password = '';
			state.confirmPassword = '';
		},
	},
});

export const { setInputValue, clearInputValue } = inputSlice.actions;

export const getInitialInputValue = (state: RootState) => state.inputReduxStore;

export default inputSlice;
