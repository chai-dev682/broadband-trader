// lib/firebaseAdmin.js
import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import path from 'path';

// const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT || '';

// // Load the service account key
// const serviceAccount = JSON.parse(
//   readFileSync(path.resolve(serviceAccountPath), 'utf8')
// );
const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}'
);
if (!admin.apps.length) {
  admin.initializeApp({
    //credential: admin.credential.cert(serviceAccount),
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://p2p-isp-contract-trading-default-rtdb.firebaseio.com' // Your database URL
  });
}

export default admin;
