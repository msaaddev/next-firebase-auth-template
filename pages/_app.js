import { AuthProvider } from 'components/context/AuthContext';
import 'styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default MyApp;
