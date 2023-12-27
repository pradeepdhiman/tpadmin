import emptySplitApi from "utils/emptySplitApi";

const applicantApis = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    filter: build.mutation({
      query: (filters) => ({
        url: "/Applicant/GetApplicants",
        method: "POST",
        body: JSON.stringify(filters),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    create: build.mutation({
      query: (data) => ({
        url: "/Applicant",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useFilterMutation, useCreateMutation } = applicantApis;
