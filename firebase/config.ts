import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBKDHigJUrZD8MWTiTNg6Vf9IdfGHfDzO0',
  authDomain: 'barber-baead.firebaseapp.com',
  projectId: 'barber-baead',
  storageBucket: 'barber-baead.appspot.com',
  messagingSenderId: '1049123993935',
  appId: '1:1049123993935:web:3fdb03ad9246285d506d3a',
  measurementId: 'G-E7JDSNKDWR',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
