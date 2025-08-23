import { Helmet } from 'react-helmet-async';
import { AppWrapperModel } from './models/appWrapper.model';

const AppWrapper: React.FC<AppWrapperModel> = ({ children }) => {
	return (
		<>
			<Helmet htmlAttributes={{ lang: 'en' }}>
				<title>NoteApp</title>
				<meta
					name='description'
					content='Scared by the amount of sticky notes on the fridge? Use our app and get rid of the problem once and for all!'
				/>
				<meta name='keywords' content='sticky notes, note app, virtual notebook' />
				<meta property='og:title' content='NoteApp' />
				<meta
					property='og:description'
					content='Tired of physical sticky notes? Keep your thoughts organized with NoteApp – your virtual notebook.'
				/>
				<meta property='og:type' content='website' />
				<meta property='og:url' content='https://with-firebase-note-app.vercel.app/' />
				<link rel='canonical' href='https://with-firebase-note-app.vercel.app/' />
			</Helmet>
			<main className='app-container'>{children}</main>
		</>
	);
};

export default AppWrapper;
