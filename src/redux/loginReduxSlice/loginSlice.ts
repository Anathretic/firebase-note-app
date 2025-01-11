import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { LoginAndRegisterModel } from '../../models/reduxSlices.model';

const initialState: LoginAndRegisterModel = {
	value: false,
};

const loginSlice = createSlice({
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
