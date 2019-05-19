import { element } from '@angular/core/src/render3';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

};
export const snapshotToArray = snapshot =>{
  let returnArray = [];
    snapshot.forEach(element=>{
      let item = element.val();
      item.key = element.key;
      returnArray.push(item);
    });

  return returnArray;
}
export const FIREBASE_CONFIG = { 
  apiKey: "AIzaSyBYRqw4_3DfCaFftp6GAGJfmRhwSwvCysY",
  authDomain: "h-lab-7912f.firebaseapp.com",
  databaseURL: "https://h-lab-7912f.firebaseio.com",
  projectId: "h-lab-7912f",
  storageBucket: "h-lab-7912f.appspot.com",
  messagingSenderId: "1021537673329",
  appId: "1:1021537673329:web:3f6fc696c71dda13"
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
