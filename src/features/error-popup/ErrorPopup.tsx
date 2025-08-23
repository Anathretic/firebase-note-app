import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/reduxHooks';
import { useFetchUserData } from '../../shared/hooks/useFetchUserData';
import { clearErrorValue, getInitialErrorPopupValue } from './redux/errorPopupSlice';

const ErrorPopup: React.FC = () => {
	const error = useAppSelector(getInitialErrorPopupValue);
	const dispatch = useAppDispatch();

	const { fetchUserData } = useFetchUserData();

	const handleButton = () => {
		if (error.includes('Refresh')) {
			fetchUserData();
			dispatch(clearErrorValue());
		} else {
			dispatch(clearErrorValue());
		}
	};

	useEffect(() => {
		document.documentElement.classList.add('scroll-block');
		return () => {
			document.documentElement.classList.remove('scroll-block');
		};
	}, []);

	return (
		<div className='error-popup'>
			<div className='error-popup__box white-gradient'>
				<p className='error-popup__message'>{error}</p>
				<button className='error-popup__button' type='button' onClick={handleButton}>
					{error.includes('Refresh') ? 'Refresh' : 'Try again'}
				</button>
			</div>
		</div>
	);
};

export default ErrorPopup;
