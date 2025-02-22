import { useAppDispatch } from '../../../hooks/reduxHooks';
import { openRegister } from '../../../redux/authReduxSlice/authSlice';
import { scrollToTop } from '../../../utils/scrollToTop';
import { LoginForm } from '../../Forms/LoginForm';

const Login: React.FC = () => {
	const dispatch = useAppDispatch();

	return (
		<section className='login'>
			<div className='login__container white-gradient'>
				<div className='login__wrapper'>
					<h2 className='login__title'>Login</h2>
					<hr className='login__strap' />
					<LoginForm />
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
		</section>
	);
};

export default Login;
