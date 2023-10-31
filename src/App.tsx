import { LoginAndRegisterPanel } from './components/LoginAndRegisterPanel';
import { MainApp } from './components/MainApp';
import { useAppSelector } from './hooks/reduxHooks';
import { getInitialLoginValue } from './redux/loginReduxSlice/loginSlice';

export const App: React.FC = () => {
	const login = useAppSelector(state => getInitialLoginValue(state));

	return <div>{!login ? <LoginAndRegisterPanel /> : <MainApp />}</div>;
};
