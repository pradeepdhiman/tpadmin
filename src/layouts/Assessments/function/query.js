
import emptySplitApi from "utils/emptySplitApi";
import { deleteRequest } from "utils/utils";
import { getRequest } from "utils/utils";
import { updateRequest } from "utils/utils";
import { readRequest } from "utils/utils";
import { createRequest } from "utils/utils";

export const assessmentApis = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        assessList: build.query({
            query: () => getRequest("/CandidateAssesment/List"),
        }),
        testDetail: build.query({
            query: (data) => getRequest("/CandidateAssesment", data),
        }),
        assessmentFilter: build.mutation({
            query: (filter) => createRequest("/CandidateAssesment/GetCandidateAssesments", filter),
        }),
    }),
});

export const { 
    useAssessListQuery,
    useTestDetailQuery,
    useAssessmentFilterMutation
 } = assessmentApis;
