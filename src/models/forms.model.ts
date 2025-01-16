export interface RegisterFormModel {
	email: string;
	password: string;
	name: string;
	confirmPassword: string;
}

export interface LoginComponentModel {
	setPasswordReset: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface LoginFormModel {
	email: string;
	password: string;
}

export interface ResetPasswordFormModel {
	email: string;
}

export interface AddOrEditNoteComponentModel {
	handleBack: () => void;
}

export interface AddOrEditNoteFormModel {
	title: string;
	note: string;
}
