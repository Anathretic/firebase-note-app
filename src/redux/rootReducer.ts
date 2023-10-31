import { combineReducers } from '@reduxjs/toolkit';
import loginSlice from './loginReduxSlice/loginSlice';

export const rootReducer = combineReducers({
	loginReduxStore: loginSlice.reducer,
});
