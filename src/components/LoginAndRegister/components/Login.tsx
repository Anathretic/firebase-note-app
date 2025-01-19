import { useState } from 'react';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { openRegister } from '../../../redux/registerReduxSlice/registerSlice';
import { scrollToTop } from '../../../utils/scrollToTop';
import { LoginForm } from '../../Forms/LoginForm';
import { ResetPasswordForm } from '../../Forms/ResetPasswordForm';

const Login: React.FC = () => {
	const [passwordReset, setPasswordReset] = useState(false);
	const dispatch = useAppDispatch();

	return (
		<div className='login'>
			<div className='login__container white-gradient'>
				<h2 className='login__title'>{passwordReset ? 'Password reset' : 'Login'}</h2>
				<hr className='login__strap' />
				{!passwordReset ? (
					<>
						<LoginForm setPasswordReset={setPasswordReset} />
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
					</>
				) : (
					<>
						<ResetPasswordForm />
						<hr className='login__strap' />
						<div className='login__form-toggle'>
							<p>But if you remember..</p>
							<button
								type='button'
								onClick={() => {
									setPasswordReset(false);
									scrollToTop();
								}}>
								Back
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Login;
