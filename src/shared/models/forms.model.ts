export type RegisterFormModel = {
	email: string;
	password: string;
	name: string;
	confirmPassword: string;
};

export type LoginFormModel = {
	email: string;
	password: string;
};

export type ResetPasswordFormModel = {
	email: string;
};

export type AddOrEditNoteFormModel = {
	title: string;
	note: string;
};
