import { FieldErrors, Path, UseFormRegister } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface CreateInputModel<T extends Record<string, any>> {
	label: string;
	inputName: Path<T>;
	type: string;
	placeholder: string;
	errors: FieldErrors<T>;
	register: UseFormRegister<T>;
}
