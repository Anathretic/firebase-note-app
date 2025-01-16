import * as yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(yup);

const errorMessage = { requiredField: 'This field is required!' };

export const registerSchema = yup.object({
	name: yup
		.string()
		.min(3, 'Must be at least 3 characters long!')
		.max(16, 'Must be a maximum of 16 characters!')
		.minUppercase(1, "You should start with a capital letter, shouldn't you?")
		.matches(/^[a-zA-Z]+$/, 'Only letters without using spaces!')
		.required(errorMessage.requiredField),
	email: yup.string().email('Enter a valid e-mail!').required(errorMessage.requiredField),
	password: yup
		.string()
		.min(8, 'Must be at least 8 characters long!')
		.minLowercase(1, 'Must be at least 1 lower case letter!')
		.minUppercase(1, 'Must be at least 1 upper case letter!')
		.minNumbers(1, 'Must be at least 1 number!')
		.minSymbols(1, 'Must be at least 1 special character!')
		.required(errorMessage.requiredField),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), undefined], 'Passwords must be the same!')
		.required(errorMessage.requiredField),
});

export const loginSchema = registerSchema.pick(['email', 'password']);

export const resetPasswordSchema = registerSchema.pick(['email']);

export const noteSchema = yup.object({
	title: yup
		.string()
		.min(3, 'Must be at least 3 characters long!')
		.max(12, 'Must be a maximum of 12 characters!')
		.matches(/^[a-zA-Z ]+$/, 'Only letters!')
		.required(errorMessage.requiredField),
	note: yup
		.string()
		.min(5, 'Must be at least 5 characters long!')
		.max(500, 'Must be a maximum of 500 characters!')
		.required(errorMessage.requiredField),
});
