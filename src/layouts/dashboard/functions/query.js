import emptySplitApi from "utils/emptySplitApi";
import { createRequest } from "utils/utils";
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
        dbCourseFilter: build.mutation({
            query: (data) => createRequest("/Course/GetCourses", data),
        }),
    }),
});

export const {
    useDbApplicantQuery,
    useDbCoursesQuery,
    useDbcourselistApplicantQuery,
    useReadChartMutation,
    useDbCourseFilterMutation,
} = dashboardApis;
