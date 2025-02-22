import { memo } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getInitialRegisterPanelValue } from '../../redux/authReduxSlice/authSlice';
import { Login, Register } from './components';

const LoginAndRegisterPanel: React.FC = () => {
	const registerStatus = useAppSelector(getInitialRegisterPanelValue);
	const LoginComponent = memo(Login);
	const RegisterComponent = memo(Register);

	return <>{!registerStatus ? <LoginComponent /> : <RegisterComponent />}</>;
};

export default LoginAndRegisterPanel;
