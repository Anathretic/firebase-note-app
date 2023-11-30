import { Login } from './Login';
import { Register } from './Register';

import { useAppSelector } from '../hooks/reduxHooks';
import { getInitialRegisterValue } from '../redux/registerReduxSlice/registerSlice';

export const LoginAndRegisterPanel: React.FC = () => {
	const registerStatus = useAppSelector(getInitialRegisterValue);

	return <>{!registerStatus ? <Login /> : <Register />}</>;
};
