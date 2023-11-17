import { useAppDispatch } from '../hooks/reduxHooks';
import { closeRegister } from '../redux/registerReduxSlice/registerSlice';
import { setErrorValue } from '../redux/errorPopupReduxSlice/errorPopupSlice';
import { scrollToTop } from '../utils/scrollToTop';

import { registerSchema } from '../schemas/schemas';
import { auth, registerUser } from '../firebase/firebaseClient';
import { collection, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

import { useForm, SubmitHandler } from 'react-hook-form';
import { RegisterInputs } from '../models/inputs.model';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateProfile } from 'firebase/auth';

export const Register: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterInputs>({
		resolver: yupResolver(registerSchema),
	});
	const dispatch = useAppDispatch();

	const onSubmit: SubmitHandler<RegisterInputs> = async ({ name, email, password }) => {
		try {
			const response = await registerUser(email, password);

			const currentUser = auth.currentUser;
			if (currentUser) {
				await updateProfile(currentUser, { displayName: name });
			}

			const user = response.user;
			const usersRef = collection(db, 'users');

			await setDoc(doc(usersRef, `${user.uid}`), {
				uid: user.uid,
				email: user.email,
				notes: [
					{
						id: 'test-note',
						title: `Hello there!`,
						description: `I'm your first note.. Looks like everything works! Enjoy your work ${user.displayName}! :)`,
					},
				],
			});
		} catch (err) {
			if (err instanceof Error) {
				if (err.message.includes('email-already-in-use')) {
					dispatch(setErrorValue('E-mail already in use!'));
				} else {
					dispatch(setErrorValue('Server is down.. We are working on it!'));
				}
			}
		}
	};

	return (
		<div className='register-container'>
			<div className='register-container--box white-gradient'>
				<h2 className='register-container--title'>Register</h2>
				<hr className='register-container--strap' />
				<form className='register-container--form' onSubmit={handleSubmit(onSubmit)}>
					<div className='register-container--form-box'>
						<label className='register-container--label' htmlFor='name'>
							Name:
						</label>
						<input
							aria-invalid={errors.name ? true : false}
							className='register-container--input'
							type='text'
							id='name'
							placeholder='Enter your name..'
							autoComplete='off'
							{...register('name')}
						/>
						<p className='register-container--input-error'>{errors.name?.message}</p>
					</div>
					<div className='register-container--form-box'>
						<label className='register-container--label' htmlFor='email'>
							E-mail:
						</label>
						<input
							aria-invalid={errors.email ? true : false}
							className='register-container--input'
							type='text'
							id='email'
							placeholder='Enter your e-mail..'
							autoComplete='off'
							{...register('email')}
						/>
						<p className='register-container--input-error'>{errors.email?.message}</p>
					</div>
					<div className='register-container--form-box'>
						<label className='register-container--label' htmlFor='password'>
							Password:
						</label>
						<input
							aria-invalid={errors.password ? true : false}
							className='register-container--input'
							type='password'
							id='password'
							placeholder='Enter your password..'
							autoComplete='off'
							{...register('password')}
						/>
						<p className='register-container--input-error'>{errors.password?.message}</p>
					</div>
					<div className='register-container--form-box'>
						<label className='register-container--label' htmlFor='confirmPassword'>
							Confirm password:
						</label>
						<input
							aria-invalid={errors.confirmPassword ? true : false}
							className='register-container--input'
							type='password'
							id='confirmPassword'
							placeholder='Confirm your password..'
							autoComplete='off'
							{...register('confirmPassword')}
						/>
						<p className='register-container--input-error'>{errors.confirmPassword?.message}</p>
					</div>
					<div className='register-container--form-box'>
						<input className='register-container--form-submit' type='submit' value='Register' />
					</div>
				</form>
				<hr className='register-container--strap' />
				<div className='register-container--form-toggle'>
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
		</div>
	);
};
