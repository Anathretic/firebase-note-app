import { useAppDispatch } from '../hooks/reduxHooks';
import { closeRegister } from '../redux/registerReduxSlice/registerSlice';
import { setErrorValue } from '../redux/errorPopupReduxSlice/errorPopupSlice';

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
		<div>
			<p>Register</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor='name'>Name:</label>
				<input type='text' id='name' placeholder='Enter your name..' autoComplete='off' {...register('name')} />
				<p>{errors.name?.message}</p>
				<label htmlFor='email'>E-mail:</label>
				<input type='text' id='email' placeholder='Enter your e-mail..' autoComplete='off' {...register('email')} />
				<p>{errors.email?.message}</p>
				<label htmlFor='password'>Password:</label>
				<input
					type='password'
					id='password'
					placeholder='Enter your password..'
					autoComplete='off'
					{...register('password')}
				/>
				<p>{errors.password?.message}</p>
				<label htmlFor='confirmPassword'>Confirm password:</label>
				<input
					type='password'
					id='confirmPassword'
					placeholder='Confirm your password..'
					autoComplete='off'
					{...register('confirmPassword')}
				/>
				<p>{errors.confirmPassword?.message}</p>
				<input type='submit' value='Register' />
				<p>
					Already have an account?{' '}
					<button
						type='button'
						onClick={() => {
							dispatch(closeRegister());
						}}>
						Login
					</button>
				</p>
			</form>
		</div>
	);
};
