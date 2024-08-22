// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, update, push, child, onValue, increment } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNMgI-Ys1AfezRj-9Ok7CL-M2Lj6zwsu8",
  authDomain: "tzuchi-info.firebaseapp.com",
  databaseURL: "https://tzuchi-info-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tzuchi-info",
  storageBucket: "tzuchi-info.appspot.com",
  messagingSenderId: "252198500627",
  appId: "1:252198500627:web:800d3c4087623b24a742e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app)
export default database

export function setData () {
  const newKey = push(child(ref(database), 'users')).key;
  set(ref(database, 'users/' + newKey), {
    username: 'set-username',
  });
}

export function increaseLike(slug) {
  // set(ref(database, slug + '/likes'), 1);
  const dbRef = ref(database, slug);
  update(dbRef, {
    likes: increment(1),
  });
}

export function increaseShare(slug) {
  // set(ref(database, slug + '/shares/'), 1);
  const dbRef = ref(database, slug);
  update(dbRef, {
    shares: increment(1),
  });
}

export function getLike(slug) {

}
