import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyBcJ5XDTRiMrUBYrEx2qgiH1B-igMqby0c',
  authDomain: 'student-2-student-93fb5.firebaseapp.com',
  projectId: 'student-2-student-93fb5',
  storageBucket: 'student-2-student-93fb5.appspot.com',
  messagingSenderId: '454889505139',
  appId: '1:454889505139:web:05986cc2f85deee8a68506',
  measurementId: 'G-T0VL4N7FE9',
};
  // Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
