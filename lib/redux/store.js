import { configureStore } from "@reduxjs/toolkit";
import userIdReducer from "./slices/user";
import resumeReducer from "./slices/resume";
export const store = configureStore({
  reducer: {
    userId: userIdReducer,
    resume: resumeReducer,
  },
});

// // Get the type of our store variable
// export type AppStore = typeof store;
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore["getState"]>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = AppStore["dispatch"];