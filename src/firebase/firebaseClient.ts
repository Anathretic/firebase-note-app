import { app } from './firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const register = (email: string, password: string) => {
	const auth = getAuth(app);
	return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email: string, password: string) => {
	const auth = getAuth(app);
	return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
	const auth = getAuth(app);
	return signOut(auth);
};
