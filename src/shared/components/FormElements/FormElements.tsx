import React from 'react';
import { InputAndTextareaModel, SubmitModel } from './models/formElements.model';

export const FormInput: React.FC<InputAndTextareaModel> = React.forwardRef<HTMLInputElement, InputAndTextareaModel>(
	({ label, inputName, type, placeholder, defaultValue, errorMessage, ...props }, ref) => {
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
				<p className='form__input-error'>{`${errorMessage === undefined ? '' : errorMessage}`}</p>
			</div>
		);
	}
);

export const FormTextarea: React.FC<InputAndTextareaModel> = React.forwardRef<
	HTMLTextAreaElement,
	InputAndTextareaModel
>(({ label, inputName, placeholder, defaultValue, errorMessage, ...props }, ref) => {
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
			<p className='form__input-error'>{`${errorMessage === undefined ? '' : errorMessage}`}</p>
		</div>
	);
});

export const FormSubmit: React.FC<SubmitModel> = ({ value }) => {
	return (
		<div className='form__box'>
			<input className='form__submit' type='submit' value={value} />
		</div>
	);
};
