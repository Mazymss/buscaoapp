import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase, ref, set, serverTimestamp } from 'firebase/database';
import {getStorage} from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {persistence: getReactNativePersistence(AsyncStorage)});
const FIREBASE_DB = getDatabase(FIREBASE_APP);
const FIREBASE_STORAGE = getStorage(FIREBASE_APP);

export { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_STORAGE };
