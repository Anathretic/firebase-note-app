import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { UserDataModel } from '../../models/reduxSlices.model';

const initialState: UserDataModel = {
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

const getInitialUserDataValue = (state: RootState) => state.userDataReduxStore.data;

export const getSortedUserData = createSelector([getInitialUserDataValue], userData => {
	return [...userData].sort((a, b) => a.date - b.date);
});

export default userDataSlice;
