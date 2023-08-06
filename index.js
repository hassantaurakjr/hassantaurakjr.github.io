// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js'

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

function HelloWorld(voucher) {
    const db = getDatabase();
    const reference = ref(db, 'data/test1');
    
    set(reference, {
        test: voucher
    });

    console.log(voucher);
}

// Function to extract parameter value from URL
function getParameterValue(parameterName, url) {
    var params = new URLSearchParams(new URL(url).search);
    return params.get(parameterName);
}

// Get the current URL of the page
var currentUrl = window.location.href;

// Get the value of the "voucher" parameter from the current URL
var voucherValue = getParameterValue("voucher", currentUrl);

HelloWorld(voucherValue);
