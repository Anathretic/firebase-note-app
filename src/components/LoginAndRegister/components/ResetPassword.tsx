import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseClient';
import { ResetPasswordForm } from '../../Forms/ResetPasswordForm';
import { scrollToTop } from '../../../utils/scrollToTop';

const ResetPassword: React.FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const isUserActive = onAuthStateChanged(auth, user => {
			if (user !== null) navigate('/');
		});
		return () => isUserActive();
	}, []);

	return (
		<section className='reset-password'>
			<div className='reset-password__container white-gradient'>
				<div className='reset-password__wrapper'>
					<h2 className='reset-password__title'>Password reset</h2>
					<hr className='reset-password__strap' />
					<ResetPasswordForm />
					<hr className='reset-password__strap' />
					<div className='reset-password__form-toggle'>
						<p>But if you remember..</p>
						<Link
							to='/'
							type='button'
							onClick={() => {
								scrollToTop();
							}}>
							Back
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ResetPassword;
