// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../features/auth/authSlice";
// import doctorReducer from "../features/doctors/doctorSlice";

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     doctor: doctorReducer,
//   },
// });

// export default store;
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import doctorReducer from "../features/doctors/doctorSlice";
import clinicReducer from "../features/clinics/clinicSlice";
import hospitalReducer from "../features/hospitals/hospitalSlice";
import diagnosticReducer from "../features/diagnostics/diagnosticSlice";
import blogReducer from "../features/blogs/blogSlice";
import successStoryReducer from "../features/successStories/successStoriesSlice";
import searchReducer from "../features/search/searchSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    doctor: doctorReducer,
    clinic: clinicReducer,
    hospital: hospitalReducer,
    diagnostic: diagnosticReducer,
    blog: blogReducer,
    successStory: successStoryReducer,
    search: searchReducer,
  },
});

export default store;
