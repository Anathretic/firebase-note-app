import { memo } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getInitialRegisterValue } from '../../redux/registerReduxSlice/registerSlice';
import { Login, Register } from './components';

const LoginAndRegisterPanel: React.FC = () => {
	const registerStatus = useAppSelector(getInitialRegisterValue);
	const LoginComponent = memo(Login);
	const RegisterComponent = memo(Register);

	return <>{!registerStatus ? <LoginComponent /> : <RegisterComponent />}</>;
};

export default LoginAndRegisterPanel;
