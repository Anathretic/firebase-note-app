import { memo, useEffect, useState } from 'react';
import { useAppSelector } from '../../shared/hooks/reduxHooks';
import { useFetchUserData } from '../../shared/hooks/useFetchUserData';
import { useRandomGreeting } from './hooks/useRandomGreeting';
import { getInitialAddOrEditNoteValue } from '../notes/redux/addOrEditNoteSlice';
import { getInitialLoginValue } from '../auth/redux/authSlice';
import NotesArray from '../notes/components/NotesArray';
import AddOrEditNote from '../notes/components/AddOrEditNote';

const Dashboard: React.FC = () => {
	const [greeting, setGreeting] = useState('');
	const loginStatus = useAppSelector(getInitialLoginValue);
	const addOrEditNoteStatus = useAppSelector(getInitialAddOrEditNoteValue);

	const { fetchUserData } = useFetchUserData();
	const { randomGreeting } = useRandomGreeting();

	const NotesArrayComponent = memo(NotesArray);

	useEffect(() => {
		const fetchingTimeout = setTimeout(() => {
			fetchUserData();
		}, 500);

		return () => clearTimeout(fetchingTimeout);
	}, [addOrEditNoteStatus, loginStatus]);

	useEffect(() => {
		if (!greeting) setGreeting(randomGreeting());
	}, [greeting]);

	return (
		<div className='dashboard'>
			{addOrEditNoteStatus !== '' ? <AddOrEditNote /> : <NotesArrayComponent greeting={greeting} />}
		</div>
	);
};

export default Dashboard;
