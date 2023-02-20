import { configureStore } from "@reduxjs/toolkit"; //wrapper, automatically add thunk etc
import { setupListeners } from "@reduxjs/toolkit/query";
import eventReducer from "../slice/event-slice";

export const store = configureStore({
	reducer: {
		event: eventReducer,
	},
});

setupListeners(store.dispatch);
