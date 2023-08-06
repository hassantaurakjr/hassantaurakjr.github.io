// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js';

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

// Get the current URL of the page
var currentUrl = window.location.href;

// Get the value of the "voucher" parameter from the current URL
var voucherValue = getParameterValue("voucher", currentUrl);

const baseUrl = 'https://server9.ictcloud.network/2417d34ce00f5fb86f2de609f5f45787/api/v2';
const loginUrl = 'https://server9.ictcloud.network/2417d34ce00f5fb86f2de609f5f45787/api/v2/login';
const getVouchersUrl = `${baseUrl}/hotspot/sites/64ae8d3dfad93d31063d7d3a/vouchers/batch/printUnused`;

// Login request data
const loginData = {
  username: 'mrHazan2023',
  password: 'Zeon#010119'
};

// Headers for login request
const loginHeaders = {
  'authority': 'server9.ictcloud.network',
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'en-PH,en-US;q=0.9,en;q=0.8,ko;q=0.7',
    'content-type': 'application/json; charset=UTF-8',
    'origin': 'https://server9.ictcloud.network',
    'referer': 'https://server9.ictcloud.network/2417d34ce00f5fb86f2de609f5f45787/login',
    'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest'
};

// Headers for authenticated GET request
let authenticatedHeaders = {
  'Content-Type': 'application/json; charset=UTF-8'
};
// Step 1: Perform the login request to get the token and cookies
axios.post(loginUrl, loginData, { loginHeaders })
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
