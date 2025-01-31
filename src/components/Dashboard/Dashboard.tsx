import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useFetchUserData } from '../../hooks/useFetchUserData';
import { getInitialAddOrEditNoteValue } from '../../redux/addOrEditNoteReduxSlice/addOrEditNoteSlice';
import { getInitialLoginValue } from '../../redux/loginReduxSlice/loginSlice';
import { NotesArray } from './components/NotesArray';
import { AddOrEditNote } from './components/AddOrEditNote';

const Dashboard: React.FC = () => {
	const [fetchUserData] = useFetchUserData();
	const loginStatus = useAppSelector(getInitialLoginValue);
	const addOrEditNoteStatus = useAppSelector(getInitialAddOrEditNoteValue);

	useEffect(() => {
		const fetchingTimeout = setTimeout(() => {
			fetchUserData();
		}, 500);

		return () => clearTimeout(fetchingTimeout);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [addOrEditNoteStatus, loginStatus]);

	return <div className='dashboard'>{addOrEditNoteStatus !== '' ? <AddOrEditNote /> : <NotesArray />}</div>;
};

export default Dashboard;
