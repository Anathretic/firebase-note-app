import { combineReducers } from '@reduxjs/toolkit';
import loginSlice from './loginReduxSlice/loginSlice';
import registerSlice from './registerReduxSlice/registerSlice';
import userDataSlice from './userDataReduxSlice/userDataSlice';
import addNotePanelSlice from './addNotePanelReduxSlice/addNotePanelSlice';
import errorPopupSlice from './errorPopupReduxSlice/errorPopupSlice';
import editNotePanelSlice from './editNotePanelReduxSlice/editNotePanelSlice';

export const rootReducer = combineReducers({
	loginReduxStore: loginSlice.reducer,
	registerReduxStore: registerSlice.reducer,
	userDataReduxStore: userDataSlice.reducer,
	addNotePanelReduxStore: addNotePanelSlice.reducer,
	editNotePanelReduxStore: editNotePanelSlice.reducer,
	errorPopupReduxStore: errorPopupSlice.reducer,
});
