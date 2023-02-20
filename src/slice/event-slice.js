import { createSlice } from "@reduxjs/toolkit";
import {
	listEvent,
	createEvent,
	listBookingData,
} from "../actions/eventActions";

const initialState = {
	eventDetails: [],
	eventDetail: "",
	bookingDatas: [],
	loading: true,
	error: null,
	success: false,
};

const eventSlice = createSlice({
	name: "event",
	initialState,
	reducers: {},
	extraReducers: {
		[listEvent.pending]: (state) => {
			state.loading = true;
			state.error = null;
			state.success = false;
		},
		[listEvent.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.success = true;
			state.eventDetails = payload;
		},
		[listEvent.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
			state.success = false;
		},
		[listBookingData.pending]: (state) => {
			state.loading = true;
			state.error = null;
			state.success = false;
		},
		[listBookingData.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.success = true;
			state.bookingDatas = payload;
		},
		[listBookingData.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
			state.success = false;
		},
		[createEvent.pending]: (state) => {
			state.loading = true;
			state.error = null;
			state.success = false;
		},
		[createEvent.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.success = true;
			state.eventDetail = payload;
		},
		[createEvent.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
			state.success = false;
		},
	},
});

export default eventSlice.reducer;
