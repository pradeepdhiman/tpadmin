
import { combineReducers } from "@reduxjs/toolkit";
import applicantSlice from "layouts/Applicants/functions/applicantSlice";
import { applicantApis } from "layouts/Applicants/functions/query";
import assessmentSlice from "layouts/Assessments/function/assessmentSlice";
import alumniSlice from "layouts/CourseAlumni/function/assessmentSlice";
import questionSlice from "layouts/CourseQuestions/functions/questionSlice";
import coursesSlice from "layouts/Courses/functions/coursesSlice";
import orderSlice from "layouts/Orders/functions/orderSlice";
import reassessmentSlice from "layouts/Reassessment/function/reassessmentSlice";
import scheduleSlice from "layouts/Schedule/functions/scheduleSlice";
import emptySplitApi from "utils/emptySplitApi";

export const rootReducer = combineReducers({
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    applicant: applicantSlice.reducer,
    courses: coursesSlice.reducer,
    schedule:scheduleSlice.reducer,
    question:questionSlice.reducer,
    order:orderSlice.reducer,
    assessment:assessmentSlice.reducer,
    reassessment:reassessmentSlice.reducer,
    alumni:alumniSlice.reducer
});

export const middlewareArr = [
    applicantApis.middleware
]

