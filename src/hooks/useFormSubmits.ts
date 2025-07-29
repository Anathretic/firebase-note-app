import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { updateProfile } from 'firebase/auth';
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { checkIfAccountExists, loginUser, passwordReset, registerUser } from '../firebase/firebaseClient';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { useNoteActions } from './useNoteActions';
import { useHandleBack } from './useHandleBack';
import { setLogin } from '../redux/authReduxSlice/authSlice';
import { setErrorValue } from '../redux/errorPopupReduxSlice/errorPopupSlice';
import { getInitialAddOrEditNoteValue } from '../redux/addOrEditNoteReduxSlice/addOrEditNoteSlice';
import { getInitialEditNoteDataValue } from '../redux/editNoteDataReduxSlice/editNoteDataSlice';
import {
	AddOrEditNoteFormModel,
	LoginFormModel,
	RegisterFormModel,
	ResetPasswordFormModel,
} from '../models/forms.model';
import { FormTypes, UseFormSubmitsModel } from '../models/hooks.model';
import { scrollToTop } from '../utils/scrollToTop';

export const useFormSubmits = <T extends FormTypes>({ reset, setButtonValue }: UseFormSubmitsModel<T>) => {
	const addOrEditNoteStatus = useAppSelector(getInitialAddOrEditNoteValue);
	const editData = useAppSelector(getInitialEditNoteDataValue);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { addNote, editNote } = useNoteActions();
	const { handleBack } = useHandleBack();

	const loginSubmit: SubmitHandler<LoginFormModel> = async ({ email, password }) => {
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

	const registerSubmit: SubmitHandler<RegisterFormModel> = async ({ name, email, password }) => {
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

	const resetPasswordSubmit: SubmitHandler<ResetPasswordFormModel> = async ({ email }) => {
		if (!reset || !setButtonValue) return;

		try {
			const methods = await checkIfAccountExists(email);
			if (methods.length === 0) {
				dispatch(setErrorValue('Email does not exist!'));
			} else {
				await passwordReset(email);
				reset();
				setButtonValue('Done');
				setTimeout(() => {
					setButtonValue('Send');
					navigate('/');
					scrollToTop();
				}, 2500);
			}
		} catch (err) {
			if (err instanceof Error) {
				dispatch(setErrorValue('Something went wrong.. Try again later!'));
			}
		}
	};

	const addOrEditNoteSubmit: SubmitHandler<AddOrEditNoteFormModel> = ({ title, note }) => {
		if (addOrEditNoteStatus === 'editNote') {
			editNote(editData, note, title, editData.id, editData.date);
		} else if (addOrEditNoteStatus === 'addNote') {
			addNote(title, note);
		}
		handleBack();
	};

	return { loginSubmit, registerSubmit, resetPasswordSubmit, addOrEditNoteSubmit };
};
