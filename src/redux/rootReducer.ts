import { combineReducers } from '@reduxjs/toolkit';
import loginSlice from './loginReduxSlice/loginSlice';
import registerSlice from './registerReduxSlice/registerSlice';
import userDataSlice from './userDataReduxSlice/userDataSlice';
import addOrEditNoteSlice from './addOrEditNoteReduxSlice/addOrEditNoteSlice';
import errorPopupSlice from './errorPopupReduxSlice/errorPopupSlice';
import editNoteDataSlice from './editNoteDataReduxSlice/editNoteDataSlice';
import randomGreetingSlice from './randomGreetingReduxSlice/randomGreetingSlice';

export const rootReducer = combineReducers({
	loginReduxStore: loginSlice.reducer,
	registerReduxStore: registerSlice.reducer,
	userDataReduxStore: userDataSlice.reducer,
	addOrEditNoteReduxStore: addOrEditNoteSlice.reducer,
	editNoteDataReduxStore: editNoteDataSlice.reducer,
	errorPopupReduxStore: errorPopupSlice.reducer,
	randomGreetingStore: randomGreetingSlice.reducer,
});
