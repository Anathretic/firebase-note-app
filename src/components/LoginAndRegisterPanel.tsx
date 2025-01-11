import { useAppSelector } from '../hooks/reduxHooks';
import { getInitialRegisterValue } from '../redux/registerReduxSlice/registerSlice';
import Login from './Login';
import Register from './Register';

const LoginAndRegisterPanel: React.FC = () => {
	const registerStatus = useAppSelector(getInitialRegisterValue);

	return <>{!registerStatus ? <Login /> : <Register />}</>;
};

export default LoginAndRegisterPanel;
