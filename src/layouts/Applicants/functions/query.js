import emptySplitApi from "utils/emptySplitApi";
import { readRequest } from "utils/utils";
import { createRequest } from "utils/utils";

const applicantApis = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    listApplicant: build.query({
      query: () => readRequest("/Applicant"),
    }),
    filter: build.mutation({
      query: (filters) => createRequest("/Applicant/GetApplicants", filters)
    }),
    create: build.mutation({
      query: (data) => createRequest("/Applicant", data),
      // query: (data) => ({
      //   url: "/Applicant",
      //   method: "POST",
      //   body: JSON.stringify(data),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }),
    }),
  }),
});

export const { useFilterMutation, useCreateMutation, useListApplicant  } = applicantApis;
