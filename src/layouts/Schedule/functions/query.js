import emptySplitApi from "utils/emptySplitApi";
import { deleteRequest } from "utils/utils";
import { getRequest } from "utils/utils";
import { updateRequest } from "utils/utils";
import { createRequest } from "utils/utils";
import { readRequest } from "utils/utils";


const scheduleApis = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        listSchedule: build.query({
            query: () => readRequest("/Schedule/List"),
        }),
        listSchedulebyCourseID: build.mutation({
            query: (data) => getRequest("/Schedule/GetScheduleListByCourse", data),
        }),
        schCoursList: build.query({
            query: () => readRequest("/Course/List"),
        }),
        filterSchedule: build.mutation({
            query: (filters) => createRequest("/Schedule/GetSchedules", filters),
        }),
        createSchedule: build.mutation({
            query: (data) => createRequest("/Schedule", data),
        }),
        getSchedule: build.mutation({
            query: (id) => getRequest("/Schedule", id),
        }),
        updateSchedule: build.mutation({
            query: (data) => updateRequest("/Schedule", data),
        }),
        deleteSchedule: build.mutation({
            query: (id) => deleteRequest("/Schedule", id),
        }),
    }),
});

export const {
    useListScheduleQuery,
    useSchCoursListQuery,
    useFilterScheduleMutation,
    useCreateScheduleMutation,
    useUpdateScheduleMutation,
    useDeleteScheduleMutation,
    useListSchedulebyCourseIDMutation,
} = scheduleApis;

