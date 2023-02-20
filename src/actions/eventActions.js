import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const listEvent = createAsyncThunk(
	"list-event",
	async (arg, { getState, rejectWithValue }) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			// make request to backend
			const { data } = await axios.get(
				`https://resource-management-backend.herokuapp.com/api/v1/event/`,
				config
			);

			return data;
		} catch (error) {
			// return custom error message from API if any
			if (error.response && error.response.data.message) {
				console.log("error1");
				return rejectWithValue(error.response.data.message);
			} else {
				console.log("error2");
				return rejectWithValue(error.message);
			}
		}
	}
);

export const createEvent = createAsyncThunk(
	"event",
	async (currentEvent, { getState, rejectWithValue }) => {
		try {
			console.log(currentEvent);
			console.log("listening...");
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			// make request to backend
			const { data } = await axios.post(
				`https://resource-management-backend.herokuapp.com/api/v1/event/`,
				currentEvent,
				config
			);
			console.log(data);

			return data;
		} catch (error) {
			// return custom error message from API if any
			if (error.response && error.response.data.message) {
				console.log("error1");
				return rejectWithValue(error.response.data.message);
			} else {
				console.log("error2");
				return rejectWithValue(error.message);
			}
		}
	}
);

export const listBookingData = createAsyncThunk(
	"list-booking-data",
	async (arg, { getState, rejectWithValue }) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			// make request to backend
			const { data } = await axios.get(
				`https://resource-management-backend.herokuapp.com/api/v1/event/booking`,
				config
			);

			return data;
		} catch (error) {
			// return custom error message from API if any
			if (error.response && error.response.data.message) {
				console.log("error1");
				return rejectWithValue(error.response.data.message);
			} else {
				console.log("error2");
				return rejectWithValue(error.message);
			}
		}
	}
);
