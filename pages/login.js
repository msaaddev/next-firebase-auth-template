import { useState } from 'react';
import fire from 'config/firebase';

// stylesheet
import css from 'styles/Auth.module.css';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailErr, setEmailErr] = useState('');
	const [passwordErr, setPasswordErr] = useState('');

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
				<button className={css.button}>Login</button>
			</div>
		</main>
	);
};

export default Login;
