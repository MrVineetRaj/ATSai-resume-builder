import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  first_name: "",
  last_name: "",
  job_title: "",
  address: "",
  phone: "",
  email: "",
  themeColor: "",
  summary: "",
  experience: "",
  education: "",
  skills: "",
};

export const resumeSlice = createSlice({
  name: "resume",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUserResume: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setUserResume } = resumeSlice.actions;

const resumeReducer = resumeSlice.reducer;

export default resumeReducer;
