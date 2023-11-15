import { combineReducers } from '@reduxjs/toolkit';
import loginSlice from './loginReduxSlice/loginSlice';
import registerSlice from './registerReduxSlice/registerSlice';
import userDataSlice from './userDataReduxSlice/userDataSlice';
import addNotePanelSlice from './addNotePanelReduxSlice/addNotePanelSlice';
import errorPopupSlice from './errorPopupReduxSlice/errorPopupSlice';

export const rootReducer = combineReducers({
	loginReduxStore: loginSlice.reducer,
	registerReduxStore: registerSlice.reducer,
	userDataReduxStore: userDataSlice.reducer,
	addNotePanelReduxStore: addNotePanelSlice.reducer,
	errorPopupReduxStore: errorPopupSlice.reducer,
});
