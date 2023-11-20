import { Link } from 'react-router-dom';

export const PageNotFound: React.FC = () => {
	return (
		<div className='notfound'>
			<img className='notfound--img' src='/notfound-img.svg' alt='Page not found image' />
			<a href='https://storyset.com/online' className='notfound--credits' target='_blank'>
				Error 404 image by Storyset
			</a>
			<Link to='/' className='notfound--btn'>
				Return
			</Link>
		</div>
	);
};
