import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  where,
  getDocs,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../utils/firebase";


export const AddPets = createAsyncThunk(
  "pets/addPet",
  async (petData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userId = auth.user?.uid;

      if (!userId) {
        return rejectWithValue("User not authenticated");
      }

      const petRef = await addDoc(collection(db, "pets"), {
        ...petData,
        userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return {
        id: petRef.id,
        ...petData,
        userId,
      };
    } catch (error) {
      return rejectWithValue(
        error.code ? `Firebase: ${error.code}` : error.message
      );
    }
  }
);

export const fetchPets = createAsyncThunk(
  "pets/fetchPets",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userId = auth.user?.uid;
      if (!userId) {
        throw new Error("User not authenticated");
      }
      const petsQuery = query(
        collection(db, "pets"),
        where("userId", "==", userId)
      );
      const querySnap = await getDocs(petsQuery);
      const pets = querySnap.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.().toISOString() || null,
          updatedAt: data.updatedAt?.toDate?.().toISOString() || null,
        };
      });
      return pets;
    } catch (error) {
      return rejectWithValue(
        error.code ? `Firebase: ${error.code}` : error.message
      );
    }
  }
);

export const addActivity = createAsyncThunk(
  "pets/addActivity",
  async (activityData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userId = auth.user?.uid;
      if (!userId) {
        throw new Error("User not authenticated");
      }
      const activityRef = await addDoc(collection(db, "activities"), {
        ...activityData,
        userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return { id: activityRef.id, ...activityData, userId };
    } catch (error) {
      return rejectWithValue(
        error.code ? `Firebase: ${error.code}` : error.message
      );
    }
  }
);

export const fetchActivities = createAsyncThunk(
  "pets/fetchActivities",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userId = auth.user?.uid;
      if (!userId) {
        throw new Error("User not authenticated");
      }
      const activitiesQuery = query(
        collection(db, "activities"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(activitiesQuery);
      const activities = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.().toISOString() || null,
          updatedAt: data.updatedAt?.toDate?.().toISOString() || null,
        };
      });
      return activities;
    } catch (error) {
      return rejectWithValue(
        error.code ? `Firebase: ${error.code}` : error.message
      );
    }
  }
);

export const fetchAppointments = createAsyncThunk(
  "pets/fetchAppointments",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userId = auth.user?.uid;
      if (!userId) {
        throw new Error("User not authenticated");
      }
      const appointmentQuery = query(
        collection(db, "appointments"),
        where("userId", "==", userId)
      );
      const querySnap = await getDocs(appointmentQuery);
      const appointments = querySnap.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          petId: data.petId || "",
          userId: data.userId || "",
          date: data.date?.toDate?.().toISOString() || null,
          reason: data.reason || "",
          vetName: data.vetName || "",
          location: data.location || "",
          createdAt: data.createdAt?.toDate?.().toISOString() || null,
          updatedAt: data.updatedAt?.toDate?.().toISOString() || null,
        };
      });
      return appointments;
    } catch (error) {
      return rejectWithValue(
        error.code ? `Firebase: ${error.code}` : error.message
      );
    }
  }
);

export const addAppointment = createAsyncThunk(
  "pets/addAppointment",
  async (appointData, { getState, rejectWithValue }) => {
    try {
      console.log("🟢 addAppointment called with:", appointData);
      const { auth } = getState();
      const userId = auth.user?.uid;
      if (!userId) {
        throw new Error("User not authenticated");
      }
      const appointmentRef = await addDoc(collection(db, "appointments"), {
        ...appointData,
        userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return { id: appointmentRef.id, ...appointData, userId };
    } catch (error) {
      return rejectWithValue(
        error.code ? `Firebase: ${error.code}` : error.message
      );
    }
  }
);
