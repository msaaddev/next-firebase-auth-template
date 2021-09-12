import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import {
	getAuth,
	signInWithEmailAndPassword,
	onAuthStateChanged
} from 'config/firebase';

// components
import Input from 'components/common/Input';
import Button from 'components/common/Button';

// context
import { AuthContext } from 'components/context/AuthContext';

// stylesheet
import css from 'styles/Auth.module.css';

const Login = () => {
	const { user, setUser } = useContext(AuthContext);
	const { email, setEmail } = useContext(AuthContext);
	const { password, setPassword } = useContext(AuthContext);
	const { emailErr, setEmailErr } = useContext(AuthContext);
	const { passwordErr, setPasswordErr } = useContext(AuthContext);
	const router = useRouter();
	const auth = getAuth();

	/**
	 *
	 *
	 * reset values of errors to empty string
	 */
	const clearErrs = () => {
		setEmailErr('');
		setPasswordErr('');
	};

	/**
	 *
	 *
	 * login to the existing account
	 */
	const handleLogin = () => {
		clearErrs();

		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				setPassword('');
				router.push('/');
			})
			.catch((err) => {
				const { code, message } = err;

				if (
					code === 'auth/invalid-email' ||
					code === 'auth/user-disabled' ||
					code === 'auth/user-not-found'
				) {
					setEmailErr(message);
				}

				if (code === 'auth/wrong-password') {
					setPasswordErr(message);
				}
			});
	};

	/**
	 *
	 *
	 * check if user exists
	 */
	const authListener = () => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setPassword('');
				setUser(user);
			} else {
				setUser('');
			}
		});
	};

	useEffect(() => {
		authListener();
	}, []);

	return (
		<main className={css.container}>
			<Input
				htmlFor="email"
				label="Email"
				type="text"
				autoFocus={true}
				value={email}
				onChange={setEmail}
				err={emailErr}
			/>
			<Input
				htmlFor="password"
				label="Password"
				type="password"
				autoFocus={false}
				value={password}
				onChange={setPassword}
				err={passwordErr}
			/>
			<Button label="Login" onClick={handleLogin} />
		</main>
	);
};

export default Login;
