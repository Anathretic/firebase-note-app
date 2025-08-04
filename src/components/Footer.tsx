import { FaGithubSquare, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
	return (
		<footer className='footer'>
			<div className='footer__text'>
				<span>Do you want to see my other projects or repo? Check the links below!</span>
				<div className='footer__icons-box'>
					<a
						className='footer__icon'
						href='https://github.com/Anathretic/firebase-note-app'
						target='_blank'
						rel='noreferrer'>
						<FaGithubSquare />
					</a>
					<a
						className='footer__icon'
						href='https://www.linkedin.com/in/konrad-wojtylo'
						target='_blank'
						rel='noreferrer'>
						<FaLinkedin />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
