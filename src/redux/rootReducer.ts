import { combineReducers } from '@reduxjs/toolkit';
import loginSlice from './loginReduxSlice/loginSlice';
import registerSlice from './registerReduxSlice/registerSlice';

export const rootReducer = combineReducers({
	loginReduxStore: loginSlice.reducer,
	registerReduxStore: registerSlice.reducer,
});
