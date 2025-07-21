import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsers,
  editAdminUser,
  fetchAllPets,
  fetchAllActivities,
  fetchAllAppointments,
} from "./adminActions";

const initialState = {
  users: [],
  pets: [{ id: "abc123", name: "Tommy", status: "active" }],
  activities: [],
  appointments: [],
  loading: {
    users: false,
    pets: false,
    activities: false,
    appointments: false,
  },
  error: {
    users: null,
    pets: null,
    activities: null,
    appointments: null,
  },
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading.users = true;
        state.error.users = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading.users = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading.users = false;
        state.error.users = action.payload;
      })
      // Edit Users
      .addCase(editAdminUser.pending, (state) => {
        state.loading.users = true;
        state.error.users = null;
      })
      .addCase(editAdminUser.fulfilled, (state, action) => {
        const { id, updates } = action.payload;
        if (state.users[id]) {
          state.users[id] = { ...state.users[id], ...updates };
        }
      })
      .addCase(editAdminUser.rejected, (state, action) => {
        state.loading.users = false;
        state.error.users = action.payload;
      })

      // Fetch Pets
      .addCase(fetchAllPets.pending, (state) => {
        state.loading.pets = true;
        state.error.pets = null;
      })
      .addCase(fetchAllPets.fulfilled, (state, action) => {
        state.loading.pets = false;
        state.pets = action.payload;
      })
      .addCase(fetchAllPets.rejected, (state, action) => {
        state.loading.pets = false;
        state.error.pets = action.payload;
      })

      // Fetch Activites
      .addCase(fetchAllActivities.pending, (state) => {
        state.loading.activities = true;
        state.error.activities = null;
      })
      .addCase(fetchAllActivities.fulfilled, (state, action) => {
        state.loading.activities = false;
        state.activities = action.payload;
      })
      .addCase(fetchAllActivities.rejected, (state, action) => {
        state.loading.activities = false;
        state.error.activities = action.payload;
      })

      // fetch Appointment
      .addCase(fetchAllAppointments.pending, (state) => {
        state.loading.appointments = true;
        state.error.appointments = null;
      })
      .addCase(fetchAllAppointments.fulfilled, (state, action) => {
        state.loading.appointments = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAllAppointments.rejected, (state, action) => {
        state.loading.appointments = false;
        state.error.appointments = action.payload;
      });
  },
});

export default adminSlice.reducer;
