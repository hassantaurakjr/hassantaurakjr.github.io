// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAw1kp981u3pq4PTufyGFE4zbizL_4HzXc",
  authDomain: "wifastconnect.firebaseapp.com",
  databaseURL: "https://wifastconnect-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wifastconnect",
  storageBucket: "wifastconnect.appspot.com",
  messagingSenderId: "69525369694",
  appId: "1:69525369694:web:b939b15eba6e83311f55cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function HelloWord()
{
    const db = getDatabase();

    const reference = ref(db, 'data/test1');
    
    set(reference,{
        test: "Hello World"
    });

    console.log("Hello");
}

HelloWord();