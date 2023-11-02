import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { LoginAndRegisterState } from '../../models/loginAndRegister.model';

const initialState: LoginAndRegisterState = {
	value: false,
};

export const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setLogin: state => {
			state.value = true;
		},
		setLogout: state => {
			state.value = false;
		},
	},
});

export const { setLogin, setLogout } = loginSlice.actions;

export const getInitialLoginValue = (state: RootState) => state.loginReduxStore.value;

export default loginSlice;
