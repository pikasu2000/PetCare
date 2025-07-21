import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  doc,
  getDocs,
  updateDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../utils/firebase";

export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const userQuery = collection(db, "users");
      const querySnap = await getDocs(userQuery);
      const users = querySnap.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          email: data.email,
          role: data.role,
          status: data.status,
          createdAt: data.createdAt?.toDate?.().toISOString() || null,
          updatedAt: data.updatedAt?.toDate?.().toISOString() || null,
        };
      });

      return users;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const editAdminUser = createAsyncThunk(
  "admin/editUser",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", id);

      await updateDoc(userRef, {
        name: updates.name,
        role: updates.role,
        status: updates.status,
        updatedAt: serverTimestamp(),
      });

      return { id, updates };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ---------------------------------------------------------------------
export const fetchAllPets = createAsyncThunk(
  "admin/fetchAllPets",
  async (_, { rejectWithValue }) => {
    try {
      const petsQuery = collection(db, "pets");
      const querySnap = await getDocs(petsQuery);
      const pets = querySnap.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          petId: data.petId || "",
          userId: data.userId || "",
          ...data,
          createdAt: data.createdAt?.toDate?.().toISOString() || null,
          updatedAt: data.updatedAt?.toDate?.().toISOString() || null,
        };
      });
      return pets;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchAllActivities = createAsyncThunk(
  "admin/fetchAllActivities",
  async (_, { rejectWithValue }) => {
    try {
      const activitesQuery = collection(db, "activities");
      const querySnap = await getDocs(activitesQuery);
      const activities = querySnap.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          petId: data.petId || "",
          userId: data.userId || "",
          ...data,
          createdAt: data.createdAt?.toDate?.().toISOString() || null,
          updatedAt: data.updatedAt?.toDate?.().toISOString() || null,
        };
      });
      return activities;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchAllAppointments = createAsyncThunk(
  "admin/fetchAllAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const appointmentQuery = collection(db, "appointments");
      const querySnap = await getDocs(appointmentQuery);
      const appointments = querySnap.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          petId: data.petId || "",
          userId: data.userId || "",
          ...data,
          createdAt: data.createdAt?.toDate?.().toISOString() || null,
          updatedAt: data.updatedAt?.toDate?.().toISOString() || null,
        };
      });
      return appointments;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
