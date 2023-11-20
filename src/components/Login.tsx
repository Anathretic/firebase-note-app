import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { loginUser } from '../firebase/firebaseClient';

import { useAppDispatch } from '../hooks/reduxHooks';
import { openRegister } from '../redux/registerReduxSlice/registerSlice';
import { setLogin } from '../redux/loginReduxSlice/loginSlice';
import { setErrorValue } from '../redux/errorPopupReduxSlice/errorPopupSlice';
import { scrollToTop } from '../utils/scrollToTop';
import { loginSchema } from '../schemas/schemas';
import { LoginInputs } from '../models/inputs.model';

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
		<div className='login-container'>
			<div className='login-container--box white-gradient'>
				<h2 className='login-container--title'>Login</h2>
				<hr className='login-container--strap' />
				<form className='login-container--form' onSubmit={handleSubmit(onSubmit)}>
					<div className='login-container--form-box'>
						<label className='login-container--label' htmlFor='email'>
							E-mail:
						</label>
						<input
							aria-invalid={errors.email ? true : false}
							className='login-container--input'
							type='text'
							id='email'
							placeholder='Enter your e-mail..'
							autoComplete='off'
							{...register('email')}
						/>
						<p className='login-container--input-error'>{errors.email?.message}</p>
					</div>
					<div className='login-container--form-box'>
						<label className='login-container--label' htmlFor='password'>
							Password:
						</label>
						<input
							aria-invalid={errors.password ? true : false}
							className='login-container--input'
							type='password'
							id='password'
							placeholder='Enter your password..'
							autoComplete='off'
							{...register('password')}
						/>
						<p className='login-container--input-error'>{errors.password?.message}</p>
					</div>
					<div className='login-container--form-box'>
						<input className='login-container--form-submit' type='submit' value='Login' />
					</div>
				</form>
				<hr className='login-container--strap' />
				<div className='login-container--form-toggle'>
					<p>Don't have an account?</p>
					<button
						type='button'
						onClick={() => {
							scrollToTop();
							dispatch(openRegister());
						}}>
						Register
					</button>
				</div>
			</div>
		</div>
	);
};
