import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFormSubmits } from '../../hooks/useFormSubmits';
import { FormInput, FormSubmit } from './components/FormElements';
import { resetPasswordSchema } from '../../schemas/schemas';
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

	const { resetPasswordSubmit } = useFormSubmits<ResetPasswordFormModel>({ reset, setButtonValue });

	return (
		<form className='form' onSubmit={handleSubmit(resetPasswordSubmit)}>
			<p className='form__special-text'>
				If you forgot your password send your email and you will receive a link to reset it. Only works if{' '}
				<span>you have an account!</span>
			</p>
			<FormInput
				label='E-mail:'
				inputName='email'
				type='text'
				placeholder='Enter your e-mail'
				errorMessage={errors.email?.message}
				aria-invalid={errors.email ? true : false}
				{...register('email')}
			/>
			<FormSubmit value={buttonValue} />
		</form>
	);
};
