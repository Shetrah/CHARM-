import { initializeApp, getApps } from "firebase/app"
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyD4jx3HSn62QaoX2wQUs3nYfUvJF8nFd-c",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "charm-3312d.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "charm-3312d",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "charm-3312d.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "11790277901",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:11790277901:web:483b9795c934c80ae7a444",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "G-PWP5RQZ1GN",
}

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const db = getFirestore(app)
let analyticsPromise: Promise<Analytics | null> | null = null

function getFirebaseAnalytics() {
  if (typeof window === "undefined") {
    return Promise.resolve(null)
  }

  analyticsPromise ??= isSupported()
    .then((supported) => (supported ? getAnalytics(app) : null))
    .catch(() => null)

  return analyticsPromise
}

export { app, db, getFirebaseAnalytics }
