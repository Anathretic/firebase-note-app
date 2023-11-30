import { useForm, SubmitHandler } from 'react-hook-form';
import { collection, setDoc, doc, Timestamp } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { yupResolver } from '@hookform/resolvers/yup';

import { auth, registerUser } from '../firebase/firebaseClient';
import { db } from '../firebase/firebaseConfig';

import { useAppDispatch } from '../hooks/reduxHooks';
import { closeRegister } from '../redux/registerReduxSlice/registerSlice';
import { setErrorValue } from '../redux/errorPopupReduxSlice/errorPopupSlice';
import { scrollToTop } from '../utils/scrollToTop';
import { registerSchema } from '../schemas/schemas';
import { RegisterInputs } from '../models/inputs.model';

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
						date: Timestamp.fromDate(new Date()).seconds,
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
			<div className='register-container__box white-gradient'>
				<h2 className='register-container__title'>Register</h2>
				<hr className='register-container__strap' />
				<form className='register-container__form' onSubmit={handleSubmit(onSubmit)}>
					<div className='register-container__form-box'>
						<label className='register-container__label' htmlFor='name'>
							Name:
						</label>
						<input
							aria-invalid={errors.name ? true : false}
							className='register-container__input'
							type='text'
							id='name'
							placeholder='Enter your name..'
							autoComplete='off'
							{...register('name')}
						/>
						<p className='register-container__input-error'>{errors.name?.message}</p>
					</div>
					<div className='register-container__form-box'>
						<label className='register-container__label' htmlFor='email'>
							E-mail:
						</label>
						<input
							aria-invalid={errors.email ? true : false}
							className='register-container__input'
							type='text'
							id='email'
							placeholder='Enter your e-mail..'
							autoComplete='off'
							{...register('email')}
						/>
						<p className='register-container__input-error'>{errors.email?.message}</p>
					</div>
					<div className='register-container__form-box'>
						<label className='register-container__label' htmlFor='password'>
							Password:
						</label>
						<input
							aria-invalid={errors.password ? true : false}
							className='register-container__input'
							type='password'
							id='password'
							placeholder='Enter your password..'
							autoComplete='off'
							{...register('password')}
						/>
						<p className='register-container__input-error'>{errors.password?.message}</p>
					</div>
					<div className='register-container__form-box'>
						<label className='register-container__label' htmlFor='confirmPassword'>
							Confirm password:
						</label>
						<input
							aria-invalid={errors.confirmPassword ? true : false}
							className='register-container__input'
							type='password'
							id='confirmPassword'
							placeholder='Confirm your password..'
							autoComplete='off'
							{...register('confirmPassword')}
						/>
						<p className='register-container__input-error'>{errors.confirmPassword?.message}</p>
					</div>
					<div className='register-container__form-box'>
						<input className='register-container__form-submit' type='submit' value='Register' />
					</div>
				</form>
				<hr className='register-container__strap' />
				<div className='register-container__form-toggle'>
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
