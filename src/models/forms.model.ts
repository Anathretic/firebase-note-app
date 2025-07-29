import { FieldErrors, Path, UseFormRegister } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface CreateInputModel<T extends Record<string, any>> {
	label: string;
	inputName: Path<T>;
	type: string;
	placeholder: string;
	errors: FieldErrors<T>;
	register: UseFormRegister<T>;
}

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

export interface ResetPasswordFormModel {
	email: string;
}

export interface AddOrEditNoteFormModel {
	title: string;
	note: string;
}
