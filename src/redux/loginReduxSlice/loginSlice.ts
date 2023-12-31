import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { BooleanReduxState } from '../../models/boolean.model';

const initialState: BooleanReduxState = {
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
