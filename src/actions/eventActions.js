import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createEvent = createAsyncThunk(
	async (event, { getState, rejectWithValue }) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			console.log(order);
			// make request to backend
			const { data } = await axios.post(
				`${process.env.REACT_APP_BASE_BACKEND_URL}/api/orders/add/`,
				order,
				config
			);
			console.log(data);

			return data;
		} catch (error) {
			// return custom error message from API if any
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);
