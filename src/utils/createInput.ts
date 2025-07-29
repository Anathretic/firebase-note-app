import { CreateInputModel } from '../models/forms.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createInput = <T extends Record<string, any>>({
	label,
	inputName,
	type,
	placeholder,
	errors,
	register,
}: CreateInputModel<T>) => ({
	label,
	inputName,
	type,
	placeholder,
	errorMessage: errors[inputName]?.message,
	isInvalid: !!errors[inputName],
	register: register(inputName),
});
