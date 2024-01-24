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
import { FormInput, FormSubmit } from './littleComponents/FormElements';

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
		<div className='register'>
			<div className='register__container white-gradient'>
				<h2 className='register__title'>Register</h2>
				<hr className='register__strap' />
				<form className='form' onSubmit={handleSubmit(onSubmit)}>
					<FormInput
						label='Name:'
						inputName='name'
						type='text'
						placeholder='Enter your name..'
						children={errors.name?.message}
						aria-invalid={errors.name ? true : false}
						{...register('name')}
					/>
					<FormInput
						label='E-mail:'
						inputName='email'
						type='text'
						placeholder='Enter your e-mail..'
						children={errors.email?.message}
						aria-invalid={errors.email ? true : false}
						{...register('email')}
					/>
					<FormInput
						label='Password:'
						inputName='password'
						type='password'
						placeholder='Enter your password..'
						children={errors.password?.message}
						aria-invalid={errors.password ? true : false}
						{...register('password')}
					/>
					<FormInput
						label='Confirm password:'
						inputName='confirmPassword'
						type='password'
						placeholder='Confirm your password..'
						children={errors.confirmPassword?.message}
						aria-invalid={errors.confirmPassword ? true : false}
						{...register('confirmPassword')}
					/>
					<FormSubmit value='Register' />
				</form>
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
		</div>
	);
};
