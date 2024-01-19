import emptySplitApi from "utils/emptySplitApi";
import { deleteRequest } from "utils/utils";
import { getRequest } from "utils/utils";
import { updateRequest } from "utils/utils";
import { createRequest } from "utils/utils";
import { readRequest } from "utils/utils";


const coursesApis = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        listCourse: build.query({
            query: () => readRequest("/Course/List"),
        }),
        scheduleById: build.mutation({
            query: (data) => getRequest("/Schedule/GetScheduleListByCourse", data),
        }),
        listSchedules: build.query({
            query: () => readRequest("/Schedule/List"),
        }),
        matList: build.query({
            query: () => readRequest("/TrainingMaterial/List"),
        }),
        filterCourse: build.mutation({
            query: (filters) => createRequest("/Course/GetCourses", filters),
        }),
        assignSchedule: build.mutation({
            query: (data) => createRequest("/CourseSchedule", data),
        }),
        addAssessmentInfo: build.mutation({
            query: (data) => createRequest("/CourseAssessment", data),
        }),
        createCourse: build.mutation({
            query: (data) => createRequest("/Course", data),
        }),
        uploadMat: build.mutation({
            query: (data) => createRequest("/TrainingMaterial", data),
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
    useMatListQuery,
    useListSchedulesQuery,
    useUploadMatMutation,
    useFilterCourseMutation,
    useCreateCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
    useAssignScheduleMutation,
    useScheduleByIdMutation,
    useAddAssessmentInfoMutation,
} = coursesApis;

