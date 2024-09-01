import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyCmypBSZDMMvpq2UGfFzMWMpoRwnRaCIR4",
  authDomain: "buscaoapp-475ef.firebaseapp.com",
  projectId: "buscaoapp-475ef",
  storageBucket: "buscaoapp-475ef.appspot.com",
  messagingSenderId: "62636780925",
  appId: "1:62636780925:web:8b0fd0ed9d17f57ef27014"
};

const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {persistence: getReactNativePersistence(AsyncStorage)});
const FIREBASE_DB = getDatabase(FIREBASE_APP);

export { FIREBASE_AUTH, FIREBASE_DB };