import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from '../../firebase/firebaseClient';
import { setLogin } from '../../redux/loginReduxSlice/loginSlice';
import { setErrorValue } from '../../redux/errorPopupReduxSlice/errorPopupSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { loginSchema } from '../../schemas/schemas';
import { LoginFormModel } from '../../models/forms.model';
import { FormInput, FormSubmit } from './components/FormElements';
import { loginFormInputsConfig } from './inputsConfig/inputsConfig';

export const LoginForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormModel>({
		resolver: yupResolver(loginSchema),
	});

	const dispatch = useAppDispatch();
	const loginFormInputs = loginFormInputsConfig(errors, register);

	const onSubmit: SubmitHandler<LoginFormModel> = async ({ email, password }) => {
		try {
			await loginUser(email, password);
			dispatch(setLogin());
		} catch (err) {
			if (err instanceof Error) {
				if (err.message.includes('invalid-login-credentials')) {
					dispatch(setErrorValue('Incorrect e-mail or password!'));
				} else {
					dispatch(setErrorValue('Server is down.. We are working on it!'));
				}
			}
		}
	};

	return (
		<form className='form' onSubmit={handleSubmit(onSubmit)}>
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
			<FormSubmit value='Login' />
		</form>
	);
};
