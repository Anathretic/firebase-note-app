import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { LoginAndRegisterState } from '../../models/loginAndRegister.model';

const initialState: LoginAndRegisterState = {
	value: false,
};

export const registerSlice = createSlice({
	name: 'register',
	initialState,
	reducers: {
		openRegister: state => {
			state.value = true;
		},
		closeRegister: state => {
			state.value = false;
		},
	},
});

export const { openRegister, closeRegister } = registerSlice.actions;

export const getInitialRegisterValue = (state: RootState) => state.registerReduxStore.value;

export default registerSlice;