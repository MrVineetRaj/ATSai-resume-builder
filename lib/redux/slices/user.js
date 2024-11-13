import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  _id: "",
};

export const userIdSlice = createSlice({
  name: "userId",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUserId: (state, action) => {
      state._id += action.payload;
    },
  },
});

export const { setUserId } = userIdSlice.actions;

const userIdReducer = userIdSlice.reducer;

export default userIdReducer;
