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

function SaveVoucher(voucher) {
  const db = getDatabase();

  // Get the current date and extract year, month, and day
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const dateId = `${year}-${month}-${day}`;

  const reference = ref(db, `data/${dateId}`);
  
  // Assuming voucher is an object with properties 'code' and 'duration'
  set(reference, {
      [voucher.code]: voucher.duration
  });

  console.log("Voucher saved successfully.");
}

// Function to extract parameter value from URL
function getParameterValue(parameterName, url) {
  var params = new URLSearchParams(new URL(url).search);
  return params.get(parameterName);
}

// Get the value of the "voucher" parameter
var voucherValue = getParameterValue("voucher", url);

const baseUrl = 'https://server9.ictcloud.network/2417d34ce00f5fb86f2de609f5f45787/api/v2';
const loginUrl = `${baseUrl}/login`;
const getVouchersUrl = `${baseUrl}/hotspot/sites/64ae8d3dfad93d31063d7d3a/vouchers/batch/printUnused`;

// Login request data
const loginData = {
  username: 'mrHazan2023',
  password: 'Zeon#010119'
};

// Headers for login request
const loginHeaders = {
  'Content-Type': 'application/json; charset=UTF-8'
};

// Headers for authenticated GET request
let authenticatedHeaders = {
  'Content-Type': 'application/json; charset=UTF-8'
};

// Step 1: Perform the login request to get the token and cookies
fetch(loginUrl, {
  method: 'POST',
  headers: loginHeaders,
  body: JSON.stringify(loginData),
  compress: true
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const cookies = response.headers.get('set-cookie');
    return response.json().then(jsonResponse => {
      return {
        cookies: cookies,
        token: jsonResponse.token
      };
    });
  })
  .then(({ cookies, token }) => {
    // Use the cookies and token for subsequent requests
    authenticatedHeaders = {
      ...authenticatedHeaders,
      'Authorization': `Bearer ${token}`,
      'Cookie': cookies
    };

    // Step 2: Perform the authenticated GET request to get vouchers
    return fetch(getVouchersUrl, {
      method: 'GET',
      headers: authenticatedHeaders,
      compress: true
    });
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the response as JSON
  })
  .then(jsonResponse => {
    // Handle the vouchers data
    const vouchers = jsonResponse.result.data;

    // Search for vouchers based on a specific code
    const foundVoucher = vouchers.find(voucher => voucher.code === voucherValue);

    if (foundVoucher) {
      SaveVoucher(foundVoucher);
    } else {
      console.log('Voucher not found.');
    }
  })
  .catch(error => {
    // Handle errors here
    console.error('There was a problem with the fetch operation:', error);
  });
