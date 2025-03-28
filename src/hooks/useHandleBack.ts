import { useAppDispatch, useAppSelector } from './reduxHooks';
import { closeIt, getInitialAddOrEditNoteValue } from '../redux/addOrEditNoteReduxSlice/addOrEditNoteSlice';
import { clearEditData } from '../redux/editNoteDataReduxSlice/editNoteDataSlice';
import { scrollToTop } from '../utils/scrollToTop';

export const useHandleBack = () => {
	const dispatch = useAppDispatch();
	const addOrEditNoteStatus = useAppSelector(getInitialAddOrEditNoteValue);

	const handleBack = () => {
		scrollToTop();
		dispatch(closeIt());
		if (addOrEditNoteStatus === 'editNote') {
			dispatch(clearEditData());
		}
	};

	return { handleBack };
};
