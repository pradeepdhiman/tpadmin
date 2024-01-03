import emptySplitApi from "utils/emptySplitApi";
import { deleteRequest } from "utils/utils";
import { updateRequest } from "utils/utils";
import { createRequest } from "utils/utils";
import { readRequest } from "utils/utils";


const scheduleApis = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        listSchedule: build.query({
            query: () => readRequest("/CourseSchedule/List"),
        }),
        filterSchedule: build.mutation({
            query: (filters) => createRequest("/CourseSchedule/GetCourseSchedules", filters),
        }),
        createSchedule: build.mutation({
            query: (data) => createRequest("/CourseSchedule", data),
        }),
        getSchedule: build.mutation({
            query: (id) => getRequest("/CourseSchedule", id),
        }),
        updateSchedule: build.mutation({
            query: (data) => updateRequest("/CourseSchedule", data),
        }),
        deleteSchedule: build.mutation({
            query: (id) => deleteRequest("/CourseSchedule", id),
        }),
    }),
});

export const {
    useListScheduleQuery,
    useFilterScheduleMutation,
    useCreateScheduleMutation,
    useUpdateScheduleMutation,
    useDeleteScheduleMutation,
} = scheduleApis;

