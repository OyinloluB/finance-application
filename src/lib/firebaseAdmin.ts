import * as admin from "firebase-admin";

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountKey) {
  throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_KEY environment variable");
}

const serviceAccount = JSON.parse(serviceAccountKey);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
