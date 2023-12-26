import emptySplitApi from "utils/emptySplitApi";

export const coursesApis = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getCoursesList: build.query({
            query: () => "/Course/List"
        }),
        postCourses: build.mutation({
            query: (filters) => ({
                url: "/Applicant/GetCourses",
                method: "POST",
                body: JSON.stringify(filters),
            }),
        }),
        postCourse: build.mutation({
            query: (course) => ({
                url: "/Course",
                method: "POST",
                body: JSON.stringify(course),
            }),
        }),
    }),
});

export const { useGetCoursesListQuery, usePostCoursesMutation, usePostCourseMutation } = coursesApis;
