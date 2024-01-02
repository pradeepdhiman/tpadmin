import emptySplitApi from "utils/emptySplitApi";
import { deleteRequest } from "utils/utils";
import { updateRequest } from "utils/utils";
import { createRequest } from "utils/utils";
import { readRequest } from "utils/utils";


const questionApis = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        listQuestion: build.mutation({
            query: () => readRequest("/CourseQuestion/List"),
        }),
        filterQuestion: build.mutation({
            query: (filters) => createRequest("/CourseQuestion/GetCourseQuestions", filters),
        }),
        createQuestion: build.mutation({
            query: (data) => createRequest("/CourseQuestion", data),
        }),
        getQuestion: build.mutation({
            query: (id) => getRequest("/CourseQuestion", id),
        }),
        updateQuestion: build.mutation({
            query: (data) => updateRequest("/CourseQuestion", data),
        }),
        deleteQuestion: build.mutation({
            query: (id) => deleteRequest("/CourseQuestion", id),
        }),
    }),
});

export const {
    useListQuestionMutation,
    useFilterQuestionMutation,
    useCreateQuestionMutation,
    useUpdateQuestionMutation,
    useDeleteQuestionMutation,
} = questionApis;