import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { DataArray } from '../../models/note.model';

const initialState: DataArray = {
	data: [],
};

const userDataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		setUserData: (state, action) => {
			state.data = action.payload;
		},
		clearUserData: state => {
			state.data = [];
		},
	},
});

export const { setUserData, clearUserData } = userDataSlice.actions;

export const getInitialUserDataValue = (state: RootState) => state.userDataReduxStore.data;

export default userDataSlice;
