import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth, createUserWithEmailAndPassword } from 'config/firebase';

// stylesheet
import css from 'styles/Auth.module.css';

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailErr, setEmailErr] = useState('');
	const [passwordErr, setPasswordErr] = useState('');
	const router = useRouter();

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
	 * sign up user if everything checks out
	 */
	const handleSignUp = () => {
		clearErrs();

		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				clearInput();
				router.push('/login');
			})
			.catch((err) => {
				const { code, message } = err;

				if (
					code === 'auth/email-already-in-use' ||
					code === 'auth/invalid-email'
				) {
					setEmailErr(message);
				}

				if (code === 'auth/weak-password') {
					setPasswordErr(message);
				}
			});
	};

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
				<button className={css.button} onClick={handleSignUp}>
					Sign Up
				</button>
			</div>
		</main>
	);
};

export default SignUp;
