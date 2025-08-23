import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
	fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { app } from './firebaseConfig';

export const auth = getAuth(app);

export const registerUser = (email: string, password: string) => {
	return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email: string, password: string) => {
	return signInWithEmailAndPassword(auth, email, password);
};

export const passwordReset = (email: string) => {
	return sendPasswordResetEmail(auth, email);
};

export const checkIfAccountExists = (email: string) => {
	return fetchSignInMethodsForEmail(auth, email);
};

export const logoutUser = () => {
	return signOut(auth);
};
