// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function HelloWorld(voucher) {
    const db = getDatabase();
    const reference = ref(db, 'data/test1');
    
    set(reference, {
        test: voucher
    });

    console.log("Hello");
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
