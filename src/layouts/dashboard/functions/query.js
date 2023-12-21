import emptySplitApi from "utils/emptySplitApi";

export const dashboardApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getApplicantList: build.query({
            query: () => "/Applicant/List"
        }),
        getCoursesList: build.query({
            query: () => "/Course/List"
        }),
        postCourses: build.mutation({
            query: (filters) => ({
                url: "/GetCourses",
                method: "POST",
                body: filters,
            }),
        }),
    }),
});

export const { useGetApplicantListQuery, useGetCoursesListQuery, usePostCoursesMutation  } = dashboardApi;
