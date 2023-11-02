import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);

const errorMessage = { requiredField: 'This field is required!' };

export const registerSchema = yup.object({
	email: yup.string().email('Enter a valid e-mail!').required(errorMessage.requiredField),
	password: yup
		.string()
		.min(8, 'Password is too short! - should be 8 chars minimum.')
		.minLowercase(1, 'Password must contain at least 1 lower case letter!')
		.minUppercase(1, 'Password must contain at least 1 upper case letter!')
		.minNumbers(1, 'Password must contain at least 1 number!')
		.minSymbols(1, 'Password must contain at least 1 special character!')
		.required(errorMessage.requiredField),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), undefined], 'Passwords must be the same!')
		.required(errorMessage.requiredField),
});

export const loginSchema = registerSchema.pick(['email', 'password']);
