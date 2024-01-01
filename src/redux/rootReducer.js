
import { combineReducers } from "@reduxjs/toolkit";
import applicantSlice from "layouts/Applicants/functions/applicantSlice";
import { applicantApis } from "layouts/Applicants/functions/query";
import coursesSlice from "layouts/Courses/functions/coursesSlice";
import scheduleSlice from "layouts/Schedule/functions/scheduleSlice";
import emptySplitApi from "utils/emptySplitApi";

export const rootReducer = combineReducers({
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    applicant: applicantSlice.reducer,
    courses: coursesSlice.reducer,
    schedule:scheduleSlice.reducer
});

export const middlewareArr = [
    applicantApis.middleware
]

