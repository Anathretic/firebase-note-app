import { useEffect } from 'react';
import { useAppSelector } from '../hooks/reduxHooks';
import { useFetchUserData } from '../hooks/useFetchUserData';
import { getInitialAddOrEditNoteValue } from '../redux/addOrEditNoteReduxSlice/addOrEditNoteSlice';
import { getInitialLoginValue } from '../redux/loginReduxSlice/loginSlice';
import { NotesArray } from './dashboardComponents/NotesArray';
import { AddOrEditNote } from './dashboardComponents/AddOrEditNote';

export const Dashboard: React.FC = () => {
	const [fetchUserData] = useFetchUserData();
	const loginStatus = useAppSelector(getInitialLoginValue);
	const addOrEditNoteStatus = useAppSelector(getInitialAddOrEditNoteValue);

	useEffect(() => {
		fetchUserData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [addOrEditNoteStatus, loginStatus]);

	return <div className='dashboard'>{addOrEditNoteStatus !== '' ? <AddOrEditNote /> : <NotesArray />}</div>;
};
