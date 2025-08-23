import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { createInput } from '../utils/createInputUtils';
import { LoginFormModel, RegisterFormModel } from '../../../models/forms.model';

export const registerFormInputsConfig = (
	errors: FieldErrors<RegisterFormModel>,
	register: UseFormRegister<RegisterFormModel>
) => {
	const fields = [
		{ label: 'Name:', inputName: 'name' as const, type: 'text', placeholder: 'Enter your name' },
		{ label: 'E-mail:', inputName: 'email' as const, type: 'text', placeholder: 'Enter your e-mail' },
		{ label: 'Password:', inputName: 'password' as const, type: 'password', placeholder: 'Enter your password' },
		{
			label: 'Confirm password:',
			inputName: 'confirmPassword' as const,
			type: 'password',
			placeholder: 'Confirm your password',
		},
	];

	return fields.map(({ label, inputName, type, placeholder }) =>
		createInput({
			label,
			inputName,
			type,
			placeholder,
			errors,
			register,
		})
	);
};

export const loginFormInputsConfig = (
	errors: FieldErrors<LoginFormModel>,
	register: UseFormRegister<LoginFormModel>
) => {
	const fields = [
		{ label: 'E-mail:', inputName: 'email' as const, type: 'text', placeholder: 'Enter your e-mail' },
		{ label: 'Password:', inputName: 'password' as const, type: 'password', placeholder: 'Enter your password' },
	];

	return fields.map(({ label, inputName, type, placeholder }) =>
		createInput({
			label,
			inputName,
			type,
			placeholder,
			errors,
			register,
		})
	);
};
