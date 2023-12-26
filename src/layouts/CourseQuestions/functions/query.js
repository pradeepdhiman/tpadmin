import emptySplitApi from "utils/emptySplitApi";

export const dashboardApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getApplicantList: build.query({
            query: () => "/Applicant/List"
        }),
        getCoursesList: build.query({
            query: () => "/Course/List"
        }),
        addQuestion: build.mutation({
            query: (question) => ({
                url: "/CourseQuestion",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(question),
            }),
        }),
    }),
});

export const { useGetApplicantListQuery, useGetCoursesListQuery, useAddQuestionMutation  } = dashboardApi;
