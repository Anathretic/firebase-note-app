import { combineReducers } from '@reduxjs/toolkit';
import loginSlice from './loginReduxSlice/loginSlice';
import registerSlice from './registerReduxSlice/registerSlice';
import inputSlice from './inputReduxSlice/inputSlice';
import userSlice from './userReduxSlice/userSlice';

export const rootReducer = combineReducers({
	loginReduxStore: loginSlice.reducer,
	registerReduxStore: registerSlice.reducer,
	inputReduxStore: inputSlice.reducer,
	userReduxStore: userSlice.reducer,
});
