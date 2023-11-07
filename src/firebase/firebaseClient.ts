import { app } from './firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const auth = getAuth(app);

export const register = (email: string, password: string) => {
	return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email: string, password: string) => {
	return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
	return signOut(auth);
};
