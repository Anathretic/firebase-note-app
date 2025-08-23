import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { scrollToTop } from '../../utils/scrollToTop';

const PageNotFound: React.FC = () => {
	const currentUrl = window.location.href;

	return (
		<>
			<Helmet htmlAttributes={{ lang: 'en' }}>
				<title>Page Not Found | NoteApp</title>
				<meta
					name='description'
					content="Oops! It looks like this page doesn't exist. Check the address or return to the home page."
				/>
				<meta property='og:title' content='Page Not Found | NoteApp' />
				<meta property='og:description' content='Page not found. Redirect to my offer.' />
				<meta property='og:type' content='website' />
				<meta property='og:url' content={currentUrl} />
				<meta name='robots' content='noindex, nofollow' />
			</Helmet>
			<main>
				<section className='notfound'>
					<img className='notfound__img' src='/notfound-img.svg' alt='Page not found image' />
					<a href='https://storyset.com/online' className='notfound__credits' target='_blank'>
						Error 404 image by Storyset
					</a>
					<Link onClick={scrollToTop} to='/' className='notfound__btn'>
						Return
					</Link>
				</section>
			</main>
		</>
	);
};

export default PageNotFound;
