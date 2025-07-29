import { UseFormReset } from 'react-hook-form';
import { AddOrEditNoteFormModel, LoginFormModel, RegisterFormModel, ResetPasswordFormModel } from './forms.model';

export type UseNoteActionsModel = (
	arg1: string | object,
	arg2: string,
	arg3?: string,
	arg4?: string,
	arg5?: number
) => Promise<void>;

export type FormTypes = LoginFormModel | RegisterFormModel | ResetPasswordFormModel | AddOrEditNoteFormModel;

export interface UseFormSubmitsModel<T extends FormTypes> {
	reset?: UseFormReset<T>;
	setButtonValue?: React.Dispatch<React.SetStateAction<string>>;
}
