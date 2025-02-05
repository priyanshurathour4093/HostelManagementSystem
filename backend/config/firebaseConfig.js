// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
require('dotenv').config();
const firebaseConfig = {
    apiKey:process.env.API_KEY,
    authDomain: "hms1-21e7c.firebaseapp.com",
    projectId: "hms1-21e7c",
    storageBucket: "hms1-21e7c.appspot.com",
    messagingSenderId: "618549370097",
    appId: process.env.APP_ID,
    measurementId: process.env.M_ID
};

module.exports = firebaseConfig;
