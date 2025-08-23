import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFormSubmits } from '../../../shared/hooks/useFormSubmits';
import { registerSchema } from '../../../schemas/schemas';
import { RegisterFormModel } from '../../../shared/models/forms.model';
import { FormInput, FormSubmit } from '../../../shared/components/FormElements/FormElements';
import { registerFormInputsConfig } from '../../../shared/components/FormElements/config/inputsConfig';

export const RegisterForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormModel>({
		resolver: yupResolver(registerSchema),
	});

	const { registerSubmit } = useFormSubmits<RegisterFormModel>({});
	const registerFormInputs = registerFormInputsConfig(errors, register);

	return (
		<form className='form' onSubmit={handleSubmit(registerSubmit)}>
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
