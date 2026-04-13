// Placeholder for Firebase Admin SDK setup
const admin = require('firebase-admin');
const fs = require('fs');

// To run in production, place your serviceAccountKey.json in the backend root directory
const serviceAccountPath = './serviceAccountKey.json';

let db = null;

try {
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = require('./serviceAccountKey.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    db = admin.firestore();
    console.log("Firebase Admin Initialized Successfully");
  } else {
    console.warn("WARNING: serviceAccountKey.json not found. Firebase Admin is NOT initialized.");
  }
} catch (error) {
  console.error("Firebase Admin Initialization Error:", error);
}

module.exports = { admin, db };
