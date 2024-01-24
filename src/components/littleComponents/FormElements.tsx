import React from 'react';
import { InputAndTextarea, Submit } from '../../models/inputs.model';

export const FormInput: React.FC<InputAndTextarea> = React.forwardRef<HTMLInputElement, InputAndTextarea>(
	({ label, inputName, type, placeholder, defaultValue, children, ...props }, ref) => {
		return (
			<div className='form__box'>
				<label className='form__label' htmlFor={inputName}>
					{label}
				</label>
				<input
					className='form__input'
					type={type}
					id={inputName}
					placeholder={placeholder}
					defaultValue={defaultValue}
					ref={ref}
					autoComplete='off'
					{...props}
				/>
				<p className='form__input-error'>{children}</p>
			</div>
		);
	}
);

export const FormTextarea: React.FC<InputAndTextarea> = React.forwardRef<HTMLTextAreaElement, InputAndTextarea>(
	({ label, inputName, placeholder, defaultValue, children, ...props }, ref) => {
		return (
			<div className='form__box'>
				<label className='form__label' htmlFor={inputName}>
					{label}
				</label>
				<textarea
					className='form__textarea'
					id={inputName}
					placeholder={placeholder}
					defaultValue={defaultValue}
					autoComplete='off'
					ref={ref}
					{...props}></textarea>
				<p className='form__input-error'>{children}</p>
			</div>
		);
	}
);

export const FormSubmit: React.FC<Submit> = ({ value }) => {
	return (
		<div className='form__box'>
			<input className='form__submit' type='submit' value={value} />
		</div>
	);
};
