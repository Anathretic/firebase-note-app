import { useEffect } from 'react';

import { NotesArray } from './dashboardComponents/NotesArray';
import { AddNotePanel } from './dashboardComponents/AddNotePanel';

import { useAppSelector } from '../hooks/reduxHooks';
import { useFetchUserData } from '../hooks/useFetchUserData';
import { getInitialAddNotePanelValue } from '../redux/addNotePanelReduxSlice/addNotePanelSlice';
import { getInitialLoginValue } from '../redux/loginReduxSlice/loginSlice';

export const Dashboard: React.FC = () => {
	const [fetchUserData] = useFetchUserData();
	const loginStatus = useAppSelector(state => getInitialLoginValue(state));
	const addNotePanelStatus = useAppSelector(state => getInitialAddNotePanelValue(state));

	useEffect(() => {
		fetchUserData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [addNotePanelStatus, loginStatus]);

	return <div className='dashboard-container'>{addNotePanelStatus ? <AddNotePanel /> : <NotesArray />}</div>;
};
