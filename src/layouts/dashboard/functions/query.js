import emptySplitApi from "utils/emptySplitApi";
import { getRequest } from "utils/utils"; 

const dashboardApis = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        dbApplicant: build.query({
            query: () => getRequest("/Applicant/List"),
        }),
        dbCourses: build.query({
            query: () => getRequest("/Course/List"),
        }),
        dbcourselistApplicant: build.query({
            query: () => getRequest("/ApplicantCourse/List"),
        }),
        readChart: build.mutation({
            query: (data) => getRequest("/Home/GetApplicantRegisteredCourse", data),
        }),
    }),
});

export const {
    useDbApplicantQuery,
    useDbCoursesQuery,
    useDbcourselistApplicantQuery,
    useReadChartMutation,
} = dashboardApis;
