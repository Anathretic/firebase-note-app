import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { AddOrEditNoteFormModel, LoginFormModel, RegisterFormModel } from './forms.model';

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
