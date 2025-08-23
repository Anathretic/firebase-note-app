import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../shared/firebase/firebaseClient';
import { ResetPasswordForm } from '../forms/ResetPasswordForm';
import { scrollToTop } from '../../../shared/utils/scrollToTop';

const ResetPassword: React.FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const isUserActive = onAuthStateChanged(auth, user => {
			if (user !== null) navigate('/');
		});
		return () => isUserActive();
	}, []);

	return (
		<>
			<Helmet htmlAttributes={{ lang: 'en' }}>
				<title>Reset Your Password | NoteApp</title>
				<meta
					name='description'
					content='Forgot your password? No worries. Reset it securely and get back to your notes in no time.'
				/>
				<meta name='keywords' content='reset password, forgot password, account recovery, NoteApp, secure login' />
				<meta property='og:title' content='Reset Your Password | NoteApp' />
				<meta
					property='og:description'
					content='Recover access to your NoteApp account by resetting your password securely.'
				/>
				<meta property='og:type' content='website' />
				<meta property='og:url' content='https://with-firebase-note-app.vercel.app/forgot-password' />{' '}
				<meta name='robots' content='noindex, nofollow' />
			</Helmet>
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
								onClick={e => {
									scrollToTop(e);
								}}>
								Back
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ResetPassword;
