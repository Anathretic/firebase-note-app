import { app } from './firebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export const register = (email: string, password: string) => {
	const auth = getAuth(app);
	return createUserWithEmailAndPassword(auth, email, password);
};
