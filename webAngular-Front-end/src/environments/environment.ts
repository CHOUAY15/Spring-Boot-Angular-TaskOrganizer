

import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyASoVL5HOCTtwIc1HySou3zl8Wbox4o8IY",
    authDomain: "gestionocpfirebase.firebaseapp.com",
    projectId: "gestionocpfirebase",
    storageBucket: "gestionocpfirebase.appspot.com",
    messagingSenderId: "785008952773",
    appId: "1:785008952773:web:a6edf5159b0938850d77ac",
     measurementId: "G-6487LW8575"
  },
   apiUrl: 'http://localhost:4000/api'
};


