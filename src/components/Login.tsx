import { useAppDispatch } from '../hooks/reduxHooks';
import { openRegister } from '../redux/registerReduxSlice/registerSlice';
import { setLogin } from '../redux/loginReduxSlice/loginSlice';
import { setErrorValue } from '../redux/errorPopupReduxSlice/errorPopupSlice';

import { loginSchema } from '../schemas/schemas';
import { loginUser } from '../firebase/firebaseClient';

import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginInputs } from '../models/inputs.model';
import { yupResolver } from '@hookform/resolvers/yup';

export const Login: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInputs>({
		resolver: yupResolver(loginSchema),
	});
	const dispatch = useAppDispatch();

	const onSubmit: SubmitHandler<LoginInputs> = async ({ email, password }) => {
		try {
			await loginUser(email, password);
			dispatch(setLogin());
		} catch (err) {
			if (err instanceof Error) {
				if (err.message.includes('invalid-login-credentials')) {
					dispatch(setErrorValue('Incorrect e-mail or password!'));
				} else {
					dispatch(setErrorValue('Server is down.. We are working on it!'));
				}
			}
		}
	};

	return (
		<div>
			<p>Login</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor='email'>E-mail:</label>
				<input type='text' id='email' placeholder='Enter your e-mail..' autoComplete='off' {...register('email')} />
				<p>{errors.email?.message}</p>
				<label htmlFor='password'>Password:</label>
				<input
					type='password'
					id='password'
					placeholder='Enter your password..'
					autoComplete='off'
					{...register('password')}
				/>
				<p>{errors.password?.message}</p>
				<input type='submit' value='Login' />
				<p>
					Don't have an account?{' '}
					<button
						type='button'
						onClick={() => {
							dispatch(openRegister());
						}}>
						Register
					</button>
				</p>
			</form>
		</div>
	);
};
