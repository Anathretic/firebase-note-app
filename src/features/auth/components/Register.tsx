import { useAppDispatch } from '../../../shared/hooks/reduxHooks';
import { closeRegister } from '../redux/authSlice';
import { RegisterForm } from '../forms/RegisterForm';
import { scrollToTop } from '../../../shared/utils/scrollToTop';

const Register: React.FC = () => {
	const dispatch = useAppDispatch();

	return (
		<section className='register'>
			<div className='register__container white-gradient'>
				<h2 className='register__title'>Register</h2>
				<hr className='register__strap' />
				<RegisterForm />
				<hr className='register__strap' />
				<div className='register__form-toggle'>
					<p>Already have an account? </p>
					<button
						type='button'
						onClick={() => {
							scrollToTop();
							dispatch(closeRegister());
						}}>
						Login
					</button>
				</div>
			</div>
		</section>
	);
};

export default Register;
