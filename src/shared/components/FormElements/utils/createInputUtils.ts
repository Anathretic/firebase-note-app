import { get } from 'react-hook-form';
import { CreateInputModel } from '../models/utils.model';

export const createInput = <T extends object>({
	label,
	inputName,
	type,
	placeholder,
	errors,
	register,
}: CreateInputModel<T>) => {
	const fieldError = get(errors, inputName);

	return {
		label,
		inputName,
		type,
		placeholder,
		errorMessage: fieldError?.message,
		isInvalid: !!fieldError,
		register: register(inputName),
	};
};
