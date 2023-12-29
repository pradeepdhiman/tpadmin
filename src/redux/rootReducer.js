
import { combineReducers } from "@reduxjs/toolkit";
import applicantSlice from "layouts/Applicants/functions/applicantSlice";
import { applicantApis } from "layouts/Applicants/functions/query";
import emptySplitApi from "utils/emptySplitApi";

export const rootReducer = combineReducers({
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    applicant: applicantSlice.reducer,
});

export const middlewareArr = [
    applicantApis.middleware
]

