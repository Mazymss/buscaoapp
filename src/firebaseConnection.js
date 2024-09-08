import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase, ref, set, serverTimestamp } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {

};

const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {persistence: getReactNativePersistence(AsyncStorage)});
const FIREBASE_DB = getDatabase(FIREBASE_APP);

export { FIREBASE_AUTH, FIREBASE_DB };