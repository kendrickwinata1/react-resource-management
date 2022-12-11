import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	event: {},
	loading: true,
	error: null,
	success: false,
};

const eventSlice = createSlice({
	name: "event",
	initialState,
	reducers: {},
});
