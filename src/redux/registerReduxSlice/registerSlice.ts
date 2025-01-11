import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { LoginAndRegisterModel } from '../../models/reduxSlices.model';

const initialState: LoginAndRegisterModel = {
	value: false,
};

const registerSlice = createSlice({
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
