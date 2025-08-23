import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
	apiKey: import.meta.env.VITE_APP_API_KEY,
	authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_APP_PROJECT_ID,
	storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize reCaptcha app check
export const appCheck = initializeAppCheck(app, {
	provider: new ReCaptchaV3Provider(import.meta.env.VITE_APP_RECAPTCHA_PUBLIC_KEY),
	isTokenAutoRefreshEnabled: true,
});

// Initialize Firestore
export const db = getFirestore(app);
