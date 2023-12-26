import emptySplitApi from "utils/emptySplitApi";

export const applicantApis = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getApplicantList: build.query({
            query: () => "/Course/List"
        }),
        getApplicants: build.mutation({
            query: (filters) => ({
                url: "/Applicant/GetAplicants", 
                method: "POST",
                body: JSON.stringify(filters),
            }),
        }),
    }),
});

export const { useGetApplicantListQuery, useGetApplicantsMutation  } = applicantApis;
