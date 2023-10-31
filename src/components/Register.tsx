import { useAppDispatch } from '../hooks/reduxHooks';
import { closeRegister } from '../redux/registerReduxSlice/registerSlice';

export const Register: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleSubmit = () => {
		dispatch(closeRegister());
	};

	return (
		<div>
			<p>Register</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor='email'></label>
				<input type='text' id='email' name='email' placeholder='Enter your e-mail..' autoComplete='off' />
				<label htmlFor='password'></label>
				<input type='password' id='password' name='password' placeholder='Enter your password..' autoComplete='off' />
				<label htmlFor='confirmPassword'></label>
				<input
					type='password'
					id='confirmPassword'
					name='confirmPassword'
					placeholder='Confirm your password..'
					autoComplete='off'
				/>
				<input type='submit' value='Register' />
				<p>
					Already have an account?{' '}
					<button type='button' onClick={() => dispatch(closeRegister())}>
						Login
					</button>
				</p>
			</form>
		</div>
	);
};
