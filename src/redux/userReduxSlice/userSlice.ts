import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface User {
	user: object | null;
}

const initialState: User = {
	user: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserData: (state, action) => {
			state.user = action.payload;
		},
		clearUserData: state => {
			state.user = null;
		},
	},
});

export const { setUserData, clearUserData } = userSlice.actions;

export const getInitialUserValue = (state: RootState) => state.userReduxStore.user;

export default userSlice;
