import { SubmitHandler, useForm } from 'react-hook-form';
import { updateProfile } from 'firebase/auth';
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerUser } from '../../firebase/firebaseClient';
import { db } from '../../firebase/firebaseConfig';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setErrorValue } from '../../redux/errorPopupReduxSlice/errorPopupSlice';
import { registerSchema } from '../../schemas/schemas';
import { RegisterFormModel } from '../../models/forms.model';
import { FormInput, FormSubmit } from './components/FormElements';
import { registerFormInputsConfig } from './inputsConfig/inputsConfig';

export const RegisterForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormModel>({
		resolver: yupResolver(registerSchema),
	});
	const dispatch = useAppDispatch();
	const registerFormInputs = registerFormInputsConfig(errors, register);

	const onSubmit: SubmitHandler<RegisterFormModel> = async ({ name, email, password }) => {
		try {
			const response = await registerUser(email, password);
			const user = response.user;

			if (user) {
				await updateProfile(user, { displayName: name });

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
			}
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
		<form className='form' onSubmit={handleSubmit(onSubmit)}>
			{registerFormInputs.map((input, id) => (
				<FormInput
					key={id}
					label={input.label}
					inputName={input.inputName}
					type={input.type}
					placeholder={input.placeholder}
					errorMessage={input.errorMessage}
					aria-invalid={input.isInvalid}
					{...input.register}
				/>
			))}
			<FormSubmit value='Register' />
		</form>
	);
};
