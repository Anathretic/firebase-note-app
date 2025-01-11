import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

type Form = LoginFormModel | RegisterFormModel | AddOrEditNoteFormModel;
type ErrorMessage = string | FieldError | Merge<FieldError, FieldErrorsImpl<Form>> | undefined;

export interface InputAndTextareaModel {
	label: string;
	inputName: string;
	placeholder: string;
	errorMessage: ErrorMessage;
	type?: string;
	defaultValue?: string;
}

export interface SubmitModel {
	value: string;
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

export interface AddOrEditNoteComponentModel {
	handleBack: () => void;
}

export interface AddOrEditNoteFormModel {
	title: string;
	note: string;
}
