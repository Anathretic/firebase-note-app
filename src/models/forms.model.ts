export interface RegisterFormModel {
	email: string;
	password: string;
	name: string;
	confirmPassword: string;
}

export interface LoginFormModel {
	email: string;
	password: string;
}

export interface AddOrEditNoteComponentModel {
	handleBack: () => void;
}

export interface AddOrEditNoteFormModel {
	title: string;
	note: string;
}
