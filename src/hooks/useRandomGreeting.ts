import { useAppDispatch } from './reduxHooks';
import { setGreeting } from '../redux/randomGreetingReduxSlice/randomGreetingSlice';

const greetingsArray: string[] = ['Hi, ', 'Hello, ', 'Greetings, ', 'Howdy, ', 'Hey, ', 'Sup, ', "G'day, ", 'Oi, '];

export const useRandomGreeting = () => {
	const dispatch = useAppDispatch();

	const randomGreeting = (): object => {
		const randomIndex = Math.floor(Math.random() * greetingsArray.length);
		const greeting = greetingsArray[randomIndex];
		return dispatch(setGreeting(greeting));
	};

	return [randomGreeting];
};
