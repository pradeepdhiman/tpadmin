
import emptySplitApi from "utils/emptySplitApi";
import { deleteRequest } from "utils/utils";
import { getRequest } from "utils/utils";
import { updateRequest } from "utils/utils";
import { readRequest } from "utils/utils";
import { createRequest } from "utils/utils";

export const assessmentApis = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        reAssessList: build.query({
            query: () => getRequest("/CandidateReassessment/List"),
        }),
        filterReassessment: build.mutation({
            query: (filter) => createRequest("/CandidateReassessment/GetCandidateReassessments", filter),
        }),
        updateReassessment: build.mutation({
            query: (data) => updateRequest("/CandidateReassessment", data),
        }),
    }),
});

export const {
    useReAssessListQuery,
    useFilterReassessmentMutation,
    useUpdateReassessmentMutation,
} = assessmentApis;
