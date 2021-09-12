import { useContext } from 'react';
import { useRouter } from 'next/router';
import { getAuth, createUserWithEmailAndPassword } from 'config/firebase';

// components
import Input from 'components/common/Input';
import Button from 'components/common/Button';

// context
import { AuthContext } from 'components/context/AuthContext';

// stylesheet
import css from 'styles/Auth.module.css';

const SignUp = () => {
	const { email, setEmail } = useContext(AuthContext);
	const { password, setPassword } = useContext(AuthContext);
	const { emailErr, setEmailErr } = useContext(AuthContext);
	const { passwordErr, setPasswordErr } = useContext(AuthContext);
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
			<Button label="Sign Up" onClick={handleSignUp} />
		</main>
	);
};

export default SignUp;
