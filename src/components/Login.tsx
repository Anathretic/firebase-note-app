import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { clearInputValue, getInitialInputValue, setInputValue } from '../redux/inputReduxSlice/inputSlice';
import { openRegister } from '../redux/registerReduxSlice/registerSlice';
import { setLogin } from '../redux/loginReduxSlice/loginSlice';

import { loginSchema } from '../schemas/schemas';
import { login } from '../firebase/firebaseClient';

import * as yup from 'yup';

export const Login: React.FC = () => {
	const input = useAppSelector(state => getInitialInputValue(state));
	const dispatch = useAppDispatch();

	const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setInputValue({ ...input, [e.currentTarget.name]: e.currentTarget.value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const { email, password } = await loginSchema.validate(input);
			await login(email, password);
			dispatch(clearInputValue());
			dispatch(setLogin());
		} catch (error: unknown) {
			if (error instanceof yup.ValidationError) {
				console.log(`Pole: ${error.path}, błąd: ${error.message} `);
			} else {
				console.log(error);
			}
		}
	};

	return (
		<div>
			<p>Login</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor='email'></label>
				<input
					type='text'
					id='email'
					name='email'
					value={input.email}
					placeholder='Enter your e-mail..'
					autoComplete='off'
					onChange={handleInputValue}
				/>
				<label htmlFor='password'></label>
				<input
					type='password'
					id='password'
					name='password'
					value={input.password}
					placeholder='Enter your password..'
					autoComplete='off'
					onChange={handleInputValue}
				/>
				<input type='submit' value='Login' />
				<p>
					Don't have an account?{' '}
					<button
						type='button'
						onClick={() => {
							dispatch(openRegister());
							dispatch(clearInputValue());
						}}>
						Register
					</button>
				</p>
			</form>
		</div>
	);
};
