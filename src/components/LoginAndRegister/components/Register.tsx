import { useAppDispatch } from '../../../hooks/reduxHooks';
import { closeRegister } from '../../../redux/registerReduxSlice/registerSlice';
import { scrollToTop } from '../../../utils/scrollToTop';
import { RegisterForm } from '../../Forms/RegisterForm';

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
