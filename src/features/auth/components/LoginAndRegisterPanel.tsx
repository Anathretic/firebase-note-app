import { memo } from 'react';
import { useAppSelector } from '../../../shared/hooks/reduxHooks';
import { getInitialRegisterPanelValue } from '../redux/authSlice';
import Login from './Login';
import Register from './Register';

const LoginAndRegisterPanel: React.FC = () => {
	const registerStatus = useAppSelector(getInitialRegisterPanelValue);
	const LoginComponent = memo(Login);
	const RegisterComponent = memo(Register);

	return <>{!registerStatus ? <LoginComponent /> : <RegisterComponent />}</>;
};

export default LoginAndRegisterPanel;
