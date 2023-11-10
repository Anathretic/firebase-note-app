import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { closeRegister } from '../redux/registerReduxSlice/registerSlice';
import { clearInputValue, getInitialInputValue, setInputValue } from '../redux/inputReduxSlice/inputSlice';

import { registerSchema } from '../schemas/schemas';
import { register } from '../firebase/firebaseClient';
import { collection, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

import * as yup from 'yup';

export const Register: React.FC = () => {
	const input = useAppSelector(state => getInitialInputValue(state));
	const dispatch = useAppDispatch();

	const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setInputValue({ ...input, [e.currentTarget.name]: e.currentTarget.value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const { email, password } = await registerSchema.validate(input);
			const response = await register(email, password);

			const user = response.user;
			const usersRef = collection(db, 'users');

			await setDoc(doc(usersRef, `${user.uid}`), {
				uid: user.uid,
				email: user.email,
				notes: [
					{
						id: 'test-note',
						title: `Hello there!`,
						description: `I'm your first note.. Looks like everything works! Enjoy your work ${input.email} :)`,
					},
				],
			});
			dispatch(clearInputValue());
		} catch (error: unknown) {
			if (error instanceof yup.ValidationError) {
				console.log(`Pole: ${error.path}, błąd: ${error.message} `);
			} else {
				console.log(error);
			}
		}
	};

	return (
		<div>
			<p>Register</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor='email'>E-mail:</label>
				<input
					type='text'
					id='email'
					name='email'
					value={input.email}
					placeholder='Enter your e-mail..'
					autoComplete='off'
					onChange={handleInputValue}
				/>
				<label htmlFor='password'>Password:</label>
				<input
					type='password'
					id='password'
					name='password'
					value={input.password}
					placeholder='Enter your password..'
					autoComplete='off'
					onChange={handleInputValue}
				/>
				<label htmlFor='confirmPassword'>Confirm password:</label>
				<input
					type='password'
					id='confirmPassword'
					name='confirmPassword'
					value={input.confirmPassword}
					placeholder='Confirm your password..'
					autoComplete='off'
					onChange={handleInputValue}
				/>
				<input type='submit' value='Register' />
				<p>
					Already have an account?{' '}
					<button
						type='button'
						onClick={() => {
							dispatch(closeRegister());
							dispatch(clearInputValue());
						}}>
						Login
					</button>
				</p>
			</form>
		</div>
	);
};
