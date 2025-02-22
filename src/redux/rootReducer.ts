import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authReduxSlice/authSlice';
import userDataSlice from './userDataReduxSlice/userDataSlice';
import addOrEditNoteSlice from './addOrEditNoteReduxSlice/addOrEditNoteSlice';
import errorPopupSlice from './errorPopupReduxSlice/errorPopupSlice';
import editNoteDataSlice from './editNoteDataReduxSlice/editNoteDataSlice';

export const rootReducer = combineReducers({
	authReduxStore: authSlice.reducer,
	userDataReduxStore: userDataSlice.reducer,
	addOrEditNoteReduxStore: addOrEditNoteSlice.reducer,
	editNoteDataReduxStore: editNoteDataSlice.reducer,
	errorPopupReduxStore: errorPopupSlice.reducer,
});
