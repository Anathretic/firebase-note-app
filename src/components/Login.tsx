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
import { FormInput, FormSubmit } from './littleComponents/FormElements';

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
		<div className='login'>
			<div className='login__container white-gradient'>
				<h2 className='login__title'>Login</h2>
				<hr className='login__strap' />
				<form className='form' onSubmit={handleSubmit(onSubmit)}>
					<FormInput
						label='E-mail:'
						inputName='email'
						type='text'
						placeholder='Enter your e-mail..'
						children={errors.email?.message}
						aria-invalid={errors.email ? true : false}
						{...register('email')}
					/>
					<FormInput
						label='Password:'
						inputName='password'
						type='password'
						placeholder='Enter your password..'
						children={errors.password?.message}
						aria-invalid={errors.password ? true : false}
						{...register('password')}
					/>
					<FormSubmit value='Login' />
				</form>
				<hr className='login__strap' />
				<div className='login__form-toggle'>
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
