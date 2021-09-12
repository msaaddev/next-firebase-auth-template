import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut
} from 'firebase/auth';

const config = {
	apiKey: `${process.env.NEXT_PUBLIC_Firebase_API_Key}`,
	authDomain: `${process.env.NEXT_PUBLIC_Auth_Domain}`,
	projectId: `${process.env.NEXT_PUBLIC_Project_Id}`,
	storageBucket: `${process.env.NEXT_PUBLIC_Storage_Bucket}`,
	messagingSenderId: `${process.env.NEXT_PUBLIC_Message_Sender_Id}`,
	appId: `${process.env.NEXT_PUBLIC_App_Id}`
};

initializeApp(config);

export {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut
};
