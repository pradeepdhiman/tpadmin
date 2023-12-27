// import emptySplitApi from "utils/emptySplitApi";

import { crudApi } from "utils/utils";

// export const dashboardApi = emptySplitApi.injectEndpoints({
//     endpoints: (build) => ({
//         getApplicantList: build.query({
//             query: () => "/Applicant/List"
//         }),
//         getCoursesList: build.query({
//             query: () => "/Course/List"
//         }),
//         addQuestion: build.mutation({
//             query: (question) => ({
//                 url: "/CourseQuestion",
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(question),
//             }),
//         }),
//     }),
// });

// export const { useGetApplicantListQuery, useGetCoursesListQuery, useAddQuestionMutation  } = dashboardApi;


const questionApis = crudApi({
    entityName: "coursequestion",
    baseUrl: "/CourseQuestion",
    endpoints: {
        list: "List",
        filter: "GetCourseQuestions",
        create: "",
        update: "",
        delete: "",
    },
});

export const {
    useGetListQuery,
    useGetFilterMutation,
    useCreateMutation,
    useUpdateMutation,
    useDeleteMutation,
} = questionApis;
