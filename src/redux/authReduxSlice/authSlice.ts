import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AuthModel } from '../../models/reduxSlices.model';

const initialState: AuthModel = {
	isLoggedIn: false,
	showRegisterPanel: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLogin: state => {
			state.isLoggedIn = true;
		},
		setLogout: state => {
			state.isLoggedIn = false;
		},
		openRegister: state => {
			state.showRegisterPanel = true;
		},
		closeRegister: state => {
			state.showRegisterPanel = false;
		},
	},
});

export const { setLogin, setLogout, openRegister, closeRegister } = authSlice.actions;

export const getInitialLoginValue = (state: RootState) => state.authReduxStore.isLoggedIn;
export const getInitialRegisterPanelValue = (state: RootState) => state.authReduxStore.showRegisterPanel;

export default authSlice;
