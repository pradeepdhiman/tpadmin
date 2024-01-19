
import emptySplitApi from "utils/emptySplitApi";
import { deleteRequest } from "utils/utils";
import { getRequest } from "utils/utils";
import { updateRequest } from "utils/utils";
import { readRequest } from "utils/utils";
import { createRequest } from "utils/utils";

export const assessmentApis = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        listApplicant: build.query({
            query: () => readRequest("/Applicant/List"),
        }),
        courseProof: build.mutation({
            query: (data) => getRequest("/ApplicantCourse", data),
        }),
        appliedCourse: build.query({
            query: (data) => getRequest("/ApplicantCourse/GetAplicantAppliedCourse", data),
        }),
        filterApplicant: build.mutation({
            query: (filters) => createRequest("/Applicant/GetApplicants", filters),
        }),
        createApplicant: build.mutation({
            query: (data) => createRequest("/Applicant", data),
        }),
        getApplicant: build.mutation({
            query: (data) => getRequest("/Applicant", data),
        }),
        updateApplicant: build.mutation({
            query: (data) => updateRequest("/Applicant", data),
        }),
        updateStatus: build.mutation({
            query: (data) => updateRequest("/ApplicantCourse", data),
        }),
        deleteApplicant: build.mutation({
            query: (id) => deleteRequest("/Applicant", id),
        }),
        applicantCompleteCourse: build.mutation({
            query: (data) => getRequest("/ApplicantCourse/GetAplicantCompletedCourses", data),
        }),
        applicantActiveCourse: build.mutation({
            query: (data) => getRequest("/ApplicantCourse/GetAplicantActiveCourses", data),
        }),
    }),
});

export const { useGetApplicantMutation,
    useUpdateApplicantMutation,
    useUpdateStatusMutation,
    useApplicantCompleteCourseMutation,
    useApplicantActiveCourseMutation,
    useFilterApplicantMutation,
    useCreateApplicantMutation,
    useDeleteApplicantMutation,
    useListApplicantQuery,
    useAppliedCourseQuery,
    useCourseProofMutation
 } = assessmentApis;
