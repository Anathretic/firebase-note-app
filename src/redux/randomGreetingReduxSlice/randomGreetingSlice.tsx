import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Greeting {
	value: string;
}

const initialState: Greeting = {
	value: '',
};

const randomGreetingSlice = createSlice({
	name: 'greeting',
	initialState,
	reducers: {
		setGreeting: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { setGreeting } = randomGreetingSlice.actions;

export const getInitialGreetingValue = (state: RootState) => state.randomGreetingStore.value;

export default randomGreetingSlice;
