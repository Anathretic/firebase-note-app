import { useEffect } from 'react';
import { useAppSelector } from '../hooks/reduxHooks';

import { getInitialAddNotePanelValue } from '../redux/addNotePanelReduxSlice/addNotePanelSlice';

import { Header } from './dashboardComponents/Header';
import { AddNotePanel } from './dashboardComponents/AddNotePanel';
import { getInitialLoginValue } from '../redux/loginReduxSlice/loginSlice';

import { useFetchUserData } from '../hooks/useFetchUserData';
import { NoteItem } from './dashboardComponents/NoteItem';

export const Dashboard: React.FC = () => {
	const [fetchUserData] = useFetchUserData();
	const loginStatus = useAppSelector(state => getInitialLoginValue(state));
	const addNotePanelStatus = useAppSelector(state => getInitialAddNotePanelValue(state));

	useEffect(() => {
		fetchUserData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [addNotePanelStatus, loginStatus]);

	return (
		<div>
			<Header />
			<div>{addNotePanelStatus ? <AddNotePanel /> : <NoteItem />}</div>
		</div>
	);
};
