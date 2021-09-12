import { useState } from 'react';
import { useRouter } from 'next/router';
import fire from 'config/firebase';

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
	 * sign up user if everything checks out
	 */
	const handleSignUp = () => {
		router.push('/login');
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
