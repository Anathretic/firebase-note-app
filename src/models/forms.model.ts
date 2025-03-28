import { UseFormReset } from 'react-hook-form';

// ---------------------useFormSubmits-----------------------

export type FormTypes = LoginFormModel | RegisterFormModel | ResetPasswordFormModel | AddOrEditNoteFormModel;

export interface UseFormSubmitsModel<T extends FormTypes> {
	reset?: UseFormReset<T>;
	setButtonValue?: React.Dispatch<React.SetStateAction<string>>;
}

// ----------------------------------------------------------

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
