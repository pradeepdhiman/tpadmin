import emptySplitApi from "utils/emptySplitApi";
import { deleteRequest } from "utils/utils";
import { postForm } from "utils/utils";
import { putForm } from "utils/utils";
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
        matListbycourse: build.query({
            query: (data) => getRequest("/TrainingMaterial/GetTrainingMaterialListByCourse", data),
        }),
        filterCourse: build.query({
            query: (filters) => createRequest("/Course/GetCourses", filters),
        }),
        assignSchedule: build.mutation({
            query: (data) => createRequest("/CourseSchedule", data),
        }),
        addAssessmentInfo: build.mutation({
            query: (data) => createRequest("/CourseAssessment", data),
        }),
        updateAssessmentInfo: build.mutation({
            query: (data) => updateRequest("/CourseAssessment", data),
        }),
        getAssessmentInfo: build.mutation({
            query: (data) => getRequest("/CourseAssessment/GetCourseAssessmentListbyCourse", data),
        }),
        createCourse: build.mutation({
            query: (data) => postForm("/Course", data),
        }),
        uploadMat: build.mutation({
            query: (data) => createRequest("/TrainingMaterial", data),
        }),
        uploadMatForm: build.mutation({
            query: (data) => postForm("/TrainingMaterial", data),
        }),
        getCourse: build.mutation({
            query: (id) => getRequest("/Course", id),
        }),
        updateCourse: build.mutation({
            query: (data) => putForm("/Course", data),
        }),
        deleteCourse: build.mutation({
            query: (id) => deleteRequest("/Course", id),
        }),
        updateSchedule: build.mutation({
            query: (data) => updateRequest("/Schedule", data),
        }),
        docFilter: build.mutation({
            query: (data) => createRequest("/ApplicantCourseDocs/GetAplicantDocs", data),
        }),
    }),
});



export const {
    useListCourseQuery,
    useMatListQuery,
    useMatListbycourseQuery,
    useListSchedulesQuery,
    useUploadMatMutation,
    useUploadMatFormMutation,
    useFilterCourseQuery,
    useCreateCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
    useAssignScheduleMutation,
    useScheduleByIdMutation,
    useAddAssessmentInfoMutation,
    useGetAssessmentInfoMutation,
    useUpdateScheduleMutation,
    useUpdateAssessmentInfoMutation,
    useDocFilterMutation,
} = coursesApis;

