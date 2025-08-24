import { FieldErrors, Path, UseFormRegister } from 'react-hook-form';

export interface CreateInputModel<T extends object> {
	label: string;
	inputName: Path<T>;
	type: string;
	placeholder: string;
	errors: FieldErrors<T>;
	register: UseFormRegister<T>;
}
