import { closeIt, getInitialAddOrEditNoteValue } from '../../features/notes/redux/addOrEditNoteSlice';
import { clearEditData } from '../redux/sharedSlices/editNoteDataSlice';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { scrollToTop } from '../utils/scrollToTop';

export const useHandleBack = () => {
	const addOrEditNoteStatus = useAppSelector(getInitialAddOrEditNoteValue);
	const dispatch = useAppDispatch();

	const handleBack = () => {
		scrollToTop();
		dispatch(closeIt());
		if (addOrEditNoteStatus === 'editNote') {
			dispatch(clearEditData());
		}
	};

	return { handleBack };
};
