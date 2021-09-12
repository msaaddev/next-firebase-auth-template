import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
	getAuth,
	signInWithEmailAndPassword,
	onAuthStateChanged
} from 'config/firebase';

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
			<div className={css.wrapper}>
				<label htmlFor="email">Email</label>
				<br />
				<input
					type="text"
					autoFocus={true}
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				{emailErr !== '' && <p className={css.err}>{emailErr}</p>}
			</div>
			<div className={css.wrapper}>
				<label htmlFor="password">Password</label>
				<br />
				<input
					type="password"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{passwordErr !== '' && <p className={css.err}>{passwordErr}</p>}
			</div>
			<div className={css.wrapper}>
				<button className={css.button} onClick={handleLogin}>
					Login
				</button>
			</div>
		</main>
	);
};

export default Login;
