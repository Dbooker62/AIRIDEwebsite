// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";
import { notification } from "antd";

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // User successfully registered
    return userCredential.user;
  } catch (error) {
    // Handle error
    throw error;
  }
};

const firebaseConfig = {
  apiKey: "AIzaSyD8TuL_uVTuvT5eLJ62mf8Tzh1Klx-Znqw",
  authDomain: "airide-66ced.firebaseapp.com",
  databaseURL: "https://airide-66ced-default-rtdb.firebaseio.com",
  projectId: "airide-66ced",
  storageBucket: "airide-66ced.appspot.com",
  messagingSenderId: "69402043146",
  appId: "1:69402043146:web:8f9380cfe7017e310f90f3",
  measurementId: "G-GVD0FKC328"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const firestore = getFirestore();
export const auth = getAuth(app);
export const messaging = getMessaging(app);
export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BIA4VtYpAya-9kDQBTyzHHIk6uF_lreczAakV7ByUeF7zuZXLG3HTgLmU0RU1UTQKuyihoz7TxHBUw5bfrQlPQg",
    });
    console.log(token);
  }
};
