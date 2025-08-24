import { combineReducers } from '@reduxjs/toolkit';
import authSlice from '../../features/auth/redux/authSlice';
import userDataSlice from './sharedSlices/userDataSlice';
import addOrEditNoteSlice from '../../features/notes/redux/addOrEditNoteSlice';
import editNoteDataSlice from './sharedSlices/editNoteDataSlice';
import errorPopupSlice from '../../features/error-popup/redux/errorPopupSlice';

export const rootReducer = combineReducers({
	authReduxStore: authSlice.reducer,
	userDataReduxStore: userDataSlice.reducer,
	addOrEditNoteReduxStore: addOrEditNoteSlice.reducer,
	editNoteDataReduxStore: editNoteDataSlice.reducer,
	errorPopupReduxStore: errorPopupSlice.reducer,
});
