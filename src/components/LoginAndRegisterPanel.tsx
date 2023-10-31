import { useAppSelector } from '../hooks/reduxHooks';
import { getInitialRegisterValue } from '../redux/registerReduxSlice/registerSlice';
import { Login } from './Login';
import { Register } from './Register';

export const LoginAndRegisterPanel: React.FC = () => {
	const register = useAppSelector(state => getInitialRegisterValue(state));

	return <div>{!register ? <Login /> : <Register />}</div>;
};
