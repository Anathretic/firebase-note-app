import { Login } from './Login';
import { Register } from './Register';

import { useAppSelector } from '../hooks/reduxHooks';
import { getInitialRegisterValue } from '../redux/registerReduxSlice/registerSlice';

export const LoginAndRegisterPanel: React.FC = () => {
	const registerStatus = useAppSelector(state => getInitialRegisterValue(state));

	return <>{!registerStatus ? <Login /> : <Register />}</>;
};
