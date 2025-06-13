import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFormSubmits } from '../../hooks/useFormSubmits';
import { loginSchema } from '../../schemas/schemas';
import { LoginFormModel } from '../../models/forms.model';
import { FormInput, FormSubmit } from './components/FormElements';
import { loginFormInputsConfig } from './inputsConfig/inputsConfig';
import { scrollToTop } from '../../utils/scrollToTop';
import { FaRegQuestionCircle } from 'react-icons/fa';

export const LoginForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormModel>({
		resolver: yupResolver(loginSchema),
	});

	const { loginSubmit } = useFormSubmits<LoginFormModel>({});
	const loginFormInputs = loginFormInputsConfig(errors, register);

	return (
		<form className='form' onSubmit={handleSubmit(loginSubmit)}>
			{loginFormInputs.map((input, id) => (
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
			<div className='form__password-reset-box'>
				<Link
					to='/forgot-password'
					className='form__password-reset-btn'
					onClick={e => {
						scrollToTop(e);
					}}>
					<FaRegQuestionCircle fontSize={18} />
				</Link>
			</div>
			<FormSubmit value='Login' />
		</form>
	);
};
