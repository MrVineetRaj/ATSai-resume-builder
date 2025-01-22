import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  _id: "",
  isLogged: false,
};

export const userIdSlice = createSlice({
  name: "userId",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action) => {
      // console.log(action.payload);
      Object.assign(state, action.payload);
    },
  },
});

export const { setUser } = userIdSlice.actions;

const userReducer = userIdSlice.reducer;

export default userReducer;
