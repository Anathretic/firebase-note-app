import { useAppSelector } from '../../hooks/reduxHooks';
import { getInitialRegisterValue } from '../../redux/registerReduxSlice/registerSlice';
import Login from './components/Login';
import Register from './components/Register';

const LoginAndRegisterPanel: React.FC = () => {
	const registerStatus = useAppSelector(getInitialRegisterValue);

	return <>{!registerStatus ? <Login /> : <Register />}</>;
};

export default LoginAndRegisterPanel;
