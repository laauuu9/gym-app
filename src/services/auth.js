import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../../firebase";

// LOGIN
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// LOGOUT
export function logout() {
  return signOut(auth);
}

// ESCUCHAR SESIÓN
export function watchAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

export async function register(email, password) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;
  console.log("Usuario creado:", user.uid);

  return user;
}
