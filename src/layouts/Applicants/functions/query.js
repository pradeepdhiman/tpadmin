import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_SERVER } from 'config/constant';
import emptySplitApi from "utils/emptySplitApi";
import { deleteRequest } from "utils/utils";
import { getRequest } from "utils/utils";
import { updateRequest } from "utils/utils";
import { readRequest } from "utils/utils";
import { createRequest } from "utils/utils";

export const applicantApis = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        listApplicant: build.query({
            query: () => readRequest("/Applicant/List"),
        }),
        filterApplicant: build.mutation({
            query: (filters) => createRequest("/Applicant/GetApplicants", filters),
        }),
        createApplicant: build.mutation({
            query: (data) => createRequest("/Applicant", data),
        }),
        getApplicant: build.mutation({
            query: (id) => getRequest("/Applicant", id),
        }),
        updateApplicant: build.mutation({
            query: (data) => updateRequest("/Applicant", data),
        }),
        deleteApplicant: build.mutation({
            query: (id) => deleteRequest("/Applicant", id),
        }),
    }),
});

export const { useGetApplicantMutation, useUpdateApplicantMutation, useFilterApplicantMutation, useCreateApplicantMutation, useDeleteApplicantMutation, useListApplicantQuery } = applicantApis;
