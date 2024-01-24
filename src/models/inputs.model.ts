export interface InputAndTextarea {
	label: string;
	inputName: string;
	placeholder: string;
	children: React.ReactNode;
	type?: string;
	defaultValue?: string;
}

export interface Submit {
	value: string;
}

export interface RegisterInputs {
	email: string;
	password: string;
	name: string;
	confirmPassword: string;
}

export interface LoginInputs {
	email: string;
	password: string;
}

export interface AddNoteInputs {
	title: string;
	note: string;
}
