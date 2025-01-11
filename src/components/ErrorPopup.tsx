import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { useFetchUserData } from '../hooks/useFetchUserData';
import { clearErrorValue, getInitialErrorPopupValue } from '../redux/errorPopupReduxSlice/errorPopupSlice';

const ErrorPopup: React.FC = () => {
	const [fetchUserData] = useFetchUserData();
	const error = useAppSelector(getInitialErrorPopupValue);
	const dispatch = useAppDispatch();

	const handleButton = () => {
		if (error.includes('Refresh')) {
			fetchUserData();
			dispatch(clearErrorValue());
		} else {
			dispatch(clearErrorValue());
		}
	};

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
