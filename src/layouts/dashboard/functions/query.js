
import emptySplitApi from "utils/emptySplitApi";
import { deleteRequest } from "utils/utils";
import { updateRequest } from "utils/utils";
import { createRequest } from "utils/utils";
import { readRequest } from "utils/utils";


const dashboardApis = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        dbApplicant: build.query({
            query: () => readRequest("/Applicant/List"),
        }),
        dbCourses: build.query({
            query: () => readRequest("/Course/List"),
        }),
        dbcourselistApplicant: build.query({
            query: () => readRequest("/ApplicantCourse/List"),
        }),
    }),
});

export const {
    useDbApplicantQuery,
    useDbCoursesQuery,
    useDbcourselistApplicantQuery,
} = dashboardApis;