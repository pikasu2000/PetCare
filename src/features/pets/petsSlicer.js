import { createSlice } from "@reduxjs/toolkit";
import {
  AddPets,
  fetchPets,
  fetchActivities,
  addActivity,
  addAppointment,
  fetchAppointments,
} from "./petsActions";

const petsSlice = createSlice({
  name: "pets",
  initialState: {
    pets: [],
    activities: [],
    appointments: [],
    loading: {
      pets: false,
      activities: false,
      appointments: false,
    },
    error: {
      pets: null,
      activities: null,
      appointments: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Pets
      .addCase(AddPets.pending, (state) => {
        state.loading.pets = true;
        state.error.pets = null;
      })
      .addCase(AddPets.fulfilled, (state, action) => {
        state.loading.pets = false;
        state.pets.push(action.payload);
      })
      .addCase(AddPets.rejected, (state, action) => {
        state.loading.pets = false;
        state.error.pets = action.payload || "Failed to add pet";
      })
      // Fetch Pets
      .addCase(fetchPets.pending, (state) => {
        state.loading.pets = true;
        state.error.pets = null;
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.loading.pets = false;
        state.pets = action.payload;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.loading.pets = false;
        state.error.pets = action.payload;
      })
      // Add Activity
      .addCase(addActivity.pending, (state) => {
        state.loading.activities = true;
        state.error.activities = null;
      })
      .addCase(addActivity.fulfilled, (state, action) => {
        state.loading.activities = false;
        state.activities.push(action.payload);
      })
      .addCase(addActivity.rejected, (state, action) => {
        state.loading.activities = false;
        state.error.activities = action.payload;
      })
      // Fetch Activities
      .addCase(fetchActivities.pending, (state) => {
        state.loading.activities = true;
        state.error.activities = null;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.loading.activities = false;
        state.activities = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading.activities = false;
        state.error.activities = action.payload;
      })
      // Add Appointment
      .addCase(addAppointment.pending, (state) => {
        state.loading.appointments = true;
        state.error.appointments = null;
      })
      .addCase(addAppointment.fulfilled, (state, action) => {
        state.loading.appointments = false;
        state.appointments.push(action.payload);
      })
      .addCase(addAppointment.rejected, (state, action) => {
        state.loading.appointments = false;
        state.error.appointments = action.payload;
      })
      // Fetch Appointments
      .addCase(fetchAppointments.pending, (state) => {
        state.loading.appointments = true;
        state.error.appointments = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading.appointments = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading.appointments = false;
        state.error.appointments = action.payload;
      });
  },
});

export default petsSlice.reducer;
