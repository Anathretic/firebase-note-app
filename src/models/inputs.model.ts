export interface RegisterInputs {
	name: string;
	email: string;
	password: string;
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
