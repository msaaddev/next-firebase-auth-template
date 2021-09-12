import { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import css from 'styles/Home.module.css';

// config
import { getAuth, signOut } from 'config/firebase';

// context
import { AuthContext } from 'components/context/AuthContext';

export default function Home() {
	const { email, setEmail } = useContext(AuthContext);

	/**
	 *
	 *
	 * logout user
	 */
	const handleLogout = () => {
		const auth = getAuth();
		signOut(auth)
			.then(() => {
				setEmail('');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className={css.container}>
			<Head>
				<title>Next.js Firebase Auth Template</title>
			</Head>

			<main className={css.main}>
				{email !== '' ? (
					<div className={css.user}>
						{' '}
						<p>User email: {email}</p>
						<button className={css.button} onClick={handleLogout}>
							Logout
						</button>
					</div>
				) : (
					<>
						<Link href="/login" passHref>
							<button className={css.button}>
								Go To Login Page →{' '}
							</button>
						</Link>
						<Link href="/signup" passHref>
							<button className={css.button}>
								Go To Sign Up Page →{' '}
							</button>
						</Link>
					</>
				)}
			</main>
		</div>
	);
}
