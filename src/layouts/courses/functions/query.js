import emptySplitApi from "utils/emptySplitApi";
import { deleteRequest } from "utils/utils";
import { updateRequest } from "utils/utils";
import { createRequest } from "utils/utils";
import { readRequest } from "utils/utils";


const coursesApis = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        listCourse: build.query({
            query: () => readRequest("/Course"),
        }),
        filterCourse: build.mutation({
            query: (filters) => createRequest("/Course/GetCourses", filters),
        }),
        createCourse: build.mutation({
            query: (course) => createRequest("/Course", course),
        }),
        updateCourse: build.mutation({
            query: ({ id, data }) => updateRequest("/Course", id, data),
        }),
        deleteCourse: build.mutation({
            query: (id) => deleteRequest("/Course", id),
        }),
    }),
});

export const {
    useListCourseQuery,
    useFilterCourseMutation,
    useCreateCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
} = coursesApis;