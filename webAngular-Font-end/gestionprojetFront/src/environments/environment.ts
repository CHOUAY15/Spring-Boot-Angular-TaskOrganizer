// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
