const greetingsArray: string[] = [
	'Hi.. ',
	'Hello.. ',
	'Greetings.. ',
	'Howdy.. ',
	'Hey.. ',
	'Sup.. ',
	"G'day.. ",
	'Oi.. ',
];

export const useRandomGreeting = () => {
	const randomGreeting = (): string => {
		const randomIndex = Math.floor(Math.random() * greetingsArray.length);
		const greeting = greetingsArray[randomIndex];
		return greeting;
	};

	return [randomGreeting];
};
