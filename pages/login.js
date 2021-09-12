import { useState } from 'react';
import fire from 'config/firebase';

// stylesheet
import css from 'styles/Auth.module.css';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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
			</div>
			<div className={css.wrapper}>
				<button className={css.button}>Login</button>
			</div>
		</main>
	);
};

export default Login;
