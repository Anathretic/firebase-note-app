import { useAppSelector } from '../hooks/reduxHooks';
import { getInitialRegisterValue } from '../redux/registerReduxSlice/registerSlice';
import { Footer } from './Footer';
import { Login } from './Login';
import { Register } from './Register';

export const LoginAndRegisterPanel: React.FC = () => {
	const registerStatus = useAppSelector(state => getInitialRegisterValue(state));

	return (
		<>
			{!registerStatus ? <Login /> : <Register />}
			<Footer />
		</>
	);
};
