import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
	getAuth,
	signInWithEmailAndPassword,
	onAuthStateChanged
} from 'config/firebase';

// components
import Input from 'components/common/Input';
import Button from 'components/common/Button';

// stylesheet
import css from 'styles/Auth.module.css';

const Login = () => {
	const [user, setUser] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailErr, setEmailErr] = useState('');
	const [passwordErr, setPasswordErr] = useState('');
	const router = useRouter();
	const auth = getAuth();

	/**
	 *
	 *
	 * reset values ofo inputs to empty string
	 */
	const clearInput = () => {
		setEmail('');
		setPassword('');
	};

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
				clearInput();
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
				clearInput();
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
