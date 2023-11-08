import { combineReducers } from '@reduxjs/toolkit';
import loginSlice from './loginReduxSlice/loginSlice';
import registerSlice from './registerReduxSlice/registerSlice';
import inputSlice from './inputReduxSlice/inputSlice';
import userDataSlice from './userDataReduxSlice/userDataSlice';
import addNotePanelSlice from './addNotePanelReduxSlice/addNotePanelSlice';
import addNoteInputSlice from './addNoteInputReduxSlice/addNoteInputSlice';

export const rootReducer = combineReducers({
	loginReduxStore: loginSlice.reducer,
	registerReduxStore: registerSlice.reducer,
	inputReduxStore: inputSlice.reducer,
	userDataReduxStore: userDataSlice.reducer,
	addNotePanelReduxStore: addNotePanelSlice.reducer,
	addNoteInputReduxStore: addNoteInputSlice.reducer,
});
