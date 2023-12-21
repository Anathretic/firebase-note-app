import { combineReducers } from '@reduxjs/toolkit';
import loginSlice from './loginReduxSlice/loginSlice';
import registerSlice from './registerReduxSlice/registerSlice';
import userDataSlice from './userDataReduxSlice/userDataSlice';
import addNotePanelSlice from './addNotePanelReduxSlice/addNotePanelSlice';
import errorPopupSlice from './errorPopupReduxSlice/errorPopupSlice';
import editNoteSlice from './editNoteReduxSlice/editNoteSlice';
import editNoteDataSlice from './editNoteDataReduxSlice/editNoteDataSlice';
import randomGreetingSlice from './randomGreetingReduxSlice/randomGreetingSlice';

export const rootReducer = combineReducers({
	loginReduxStore: loginSlice.reducer,
	registerReduxStore: registerSlice.reducer,
	userDataReduxStore: userDataSlice.reducer,
	addNotePanelReduxStore: addNotePanelSlice.reducer,
	editNoteReduxStore: editNoteSlice.reducer,
	editNoteDataReduxStore: editNoteDataSlice.reducer,
	errorPopupReduxStore: errorPopupSlice.reducer,
	randomGreetingStore: randomGreetingSlice.reducer,
});
