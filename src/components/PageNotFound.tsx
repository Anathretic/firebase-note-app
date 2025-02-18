import { Link } from 'react-router-dom';
import { scrollToTop } from '../utils/scrollToTop';

const PageNotFound: React.FC = () => {
	return (
		<div className='notfound'>
			<img className='notfound__img' src='/notfound-img.svg' alt='Page not found image' />
			<a href='https://storyset.com/online' className='notfound__credits' target='_blank'>
				Error 404 image by Storyset
			</a>
			<Link onClick={scrollToTop} to='/' className='notfound__btn'>
				Return
			</Link>
		</div>
	);
};

export default PageNotFound;
