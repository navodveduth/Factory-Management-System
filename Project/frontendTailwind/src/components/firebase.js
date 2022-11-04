// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBNUJtI8cDbkDNuFU7hgT-3ctixZdcxyUk',
  authDomain: 'factory-ms.firebaseapp.com',
  projectId: 'factory-ms',
  storageBucket: 'factory-ms.appspot.com',
  messagingSenderId: '395218793475',
  appId: '1:395218793475:web:4237caee6a9ce20ecaca36',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
