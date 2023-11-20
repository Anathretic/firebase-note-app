import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { PageNotFound } from './components/PageNotFound';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '*',
		element: <PageNotFound />,
	},
]);
