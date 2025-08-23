import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { EditNoteDataModel } from '../../shared/models/reduxSlices.model';

const initialState: EditNoteDataModel = {
	data: {
		id: '',
		title: '',
		description: '',
		date: 0,
	},
};

const editNoteDataSlice = createSlice({
	name: 'editData',
	initialState,
	reducers: {
		setEditData: (state, action) => {
			state.data = action.payload;
		},
		clearEditData: state => {
			state.data = {
				id: '',
				title: '',
				description: '',
				date: 0,
			};
		},
	},
});

export const { setEditData, clearEditData } = editNoteDataSlice.actions;

export const getInitialEditNoteDataValue = (state: RootState) => state.editNoteDataReduxStore.data;

export default editNoteDataSlice;
