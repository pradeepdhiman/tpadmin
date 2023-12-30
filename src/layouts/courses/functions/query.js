import emptySplitApi from "utils/emptySplitApi";
import { deleteRequest } from "utils/utils";
import { updateRequest } from "utils/utils";
import { createRequest } from "utils/utils";
import { readRequest } from "utils/utils";


const coursesApis = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        listCourse: build.query({
            query: () => readRequest("/Course/List"),
        }),
        filterCourse: build.mutation({
            query: (filters) => createRequest("/Course/GetCourses", filters),
        }),
        createCourse: build.mutation({
            query: (data) => createRequest("/Course", data),
        }),
        getCourse: build.mutation({
            query: (id) => getRequest("/Course", id),
        }),
        updateCourse: build.mutation({
            query: (data) => updateRequest("/Course", data),
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