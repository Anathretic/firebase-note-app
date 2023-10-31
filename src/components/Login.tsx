import { useAppDispatch } from '../hooks/reduxHooks';
import { setLogin } from '../redux/loginReduxSlice/loginSlice';
import { openRegister } from '../redux/registerReduxSlice/registerSlice';

export const Login: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleSubmit = () => {
		dispatch(setLogin());
	};

	return (
		<div>
			<p>Login</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor='email'></label>
				<input type='text' id='email' name='email' placeholder='Enter your e-mail..' autoComplete='off' />
				<label htmlFor='password'></label>
				<input type='password' id='password' name='password' placeholder='Enter your password..' autoComplete='off' />
				<input type='submit' value='Login' />
				<p>
					Don't have an account?{' '}
					<button type='button' onClick={() => dispatch(openRegister())}>
						Register
					</button>
				</p>
			</form>
		</div>
	);
};
