import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { db } from "../../utils/firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../../utils/firebase";

// 🔹 SIGN UP
export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const UserCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(UserCred.user, { displayName: name });

      await setDoc(doc(db, "users", UserCred.user.uid), {
        email,
        name,
        role: "user",
        status: "active",
        createdAt: serverTimestamp(),
      });

      const user = {
        uid: UserCred.user.uid,
        email: UserCred.user.email,
        displayName: name,
        role: "user",
        status: UserCred.status,
      };
      await signOutUser(auth);
      return null;
    } catch (error) {
      let errorMessage = "An error occurred during SignUp.";
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already registered.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email format.";
          break;
        case "auth/weak-password":
          errorMessage = "Password must be at least 6 characters.";
          break;
        default:
          errorMessage = error.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// 🔹 LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const Usercred = await signInWithEmailAndPassword(auth, email, password);

      const userDocRef = doc(db, "users", Usercred.user.uid);
      const userSnap = await getDoc(userDocRef);
      const userData = userSnap.exists() ? userSnap.data() : {};

      if (userData.status !== "active") {
        await signOut(auth);
        return thunkAPI.rejectWithValue(
          "Your account is disabled. Please contact admin."
        );
      }
      const user = {
        uid: Usercred.user.uid,
        email: Usercred.user.email,
        displayName: userData.name || Usercred.user.displayName || "Guest",
        role: userData.role || "user",
        status: userData.status || "inactive",
      };

      return user;
    } catch (error) {
      let errorMessage = "An error occurred during Login.";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid Email";
          break;
        case "auth/user-not-found":
          errorMessage = "User not found!";
          break;
        case "auth/wrong-password":
          errorMessage = "Password is wrong";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many attempts. Please try again later.";
          break;
        default:
          errorMessage = error.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// LOGOUT
export const signOutUser = createAsyncThunk(
  "auth/signOutUser",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
      console.log("Logout Success");
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "An error occurred during signout."
      );
    }
  }
);
