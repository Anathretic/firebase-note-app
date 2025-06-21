import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { LoginFormModel, RegisterFormModel } from '../../../models/forms.model';

export const registerFormInputsConfig = (errors: FieldErrors, register: UseFormRegister<RegisterFormModel>) => [
	{
		label: 'Name:',
		inputName: 'name',
		type: 'text',
		placeholder: 'Enter your name',
		errorMessage: errors.name?.message,
		isInvalid: !!errors.name,
		register: register('name'),
	},
	{
		label: 'E-mail:',
		inputName: 'email',
		type: 'text',
		placeholder: 'Enter your e-mail',
		errorMessage: errors.email?.message,
		isInvalid: !!errors.email,
		register: register('email'),
	},
	{
		label: 'Password:',
		inputName: 'password',
		type: 'password',
		placeholder: 'Enter your password',
		errorMessage: errors.password?.message,
		isInvalid: !!errors.password,
		register: register('password'),
	},
	{
		label: 'Confirm password:',
		inputName: 'confirmPassword',
		type: 'password',
		placeholder: 'Confirm your password',
		errorMessage: errors.confirmPassword?.message,
		isInvalid: !!errors.confirmPassword,
		register: register('confirmPassword'),
	},
];

export const loginFormInputsConfig = (errors: FieldErrors, register: UseFormRegister<LoginFormModel>) => [
	{
		label: 'E-mail:',
		inputName: 'email',
		type: 'text',
		placeholder: 'Enter your e-mail',
		errorMessage: errors.email?.message,
		isInvalid: !!errors.email,
		register: register('email'),
	},
	{
		label: 'Password:',
		inputName: 'password',
		type: 'password',
		placeholder: 'Enter your password',
		errorMessage: errors.password?.message,
		isInvalid: !!errors.password,
		register: register('password'),
	},
];
