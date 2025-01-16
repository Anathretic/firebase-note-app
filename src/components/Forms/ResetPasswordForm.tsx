import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkIfAccountExists, passwordReset } from '../../firebase/firebaseClient';
import { FormInput, FormSubmit } from './components/FormElements';
import { resetPasswordSchema } from '../../schemas/schemas';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setErrorValue } from '../../redux/errorPopupReduxSlice/errorPopupSlice';
import { ResetPasswordFormModel } from '../../models/forms.model';

export const ResetPasswordForm: React.FC = () => {
	const [buttonValue, setButtonValue] = useState('Send');
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ResetPasswordFormModel>({
		defaultValues: {
			email: '',
		},
		resolver: yupResolver(resetPasswordSchema),
	});
	const dispatch = useAppDispatch();

	const onSubmit: SubmitHandler<ResetPasswordFormModel> = async ({ email }) => {
		try {
			const methods = await checkIfAccountExists(email);
			if (methods.length === 0) {
				dispatch(setErrorValue('Email does not exist!'));
			} else {
				await passwordReset(email);
				reset();
				setButtonValue('Sent');
				setTimeout(() => {
					setButtonValue('Send');
				}, 2500);
			}
		} catch (err) {
			if (err instanceof Error) {
				dispatch(setErrorValue('Something went wrong.. Try again later!'));
			}
		}
	};

	return (
		<form className='form' onSubmit={handleSubmit(onSubmit)}>
			<p className='form__special-text'>
				If you forgot your password send your email and you will receive a link to reset it. Only works if{' '}
				<span>you have an account</span> with the site!
			</p>
			<FormInput
				label='E-mail:'
				inputName='email'
				type='text'
				placeholder='Enter your e-mail..'
				errorMessage={errors.email?.message}
				aria-invalid={errors.email ? true : false}
				{...register('email')}
			/>
			<FormSubmit value={buttonValue} />
		</form>
	);
};
