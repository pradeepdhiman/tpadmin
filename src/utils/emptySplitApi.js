import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_SERVER } from "config/constant";


const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_SERVER }),
  endpoints: () => ({}),
})

export default emptySplitApi

// import emptySplitApi from "utils/emptySplitApi";

// const crudApi = ({ entityName, baseUrl, endpoints }) => {
//   const createEndpointUrl = (endpoint) => `${baseUrl}/${entityName}/${endpoint}`;

//   return emptySplitApi.injectEndpoints({
//     endpoints: (build) => ({
//       getList: build.query({
//         query: () => createEndpointUrl(endpoints.list),
//       }),
//       create: build.mutation({
//         query: (data) => ({
//           url: createEndpointUrl(endpoints.create),
//           method: "POST",
//           body: JSON.stringify(data),
//         }),
//       }),
//       update: build.mutation({
//         query: ({ id, data }) => ({
//           url: createEndpointUrl(`${endpoints.update}/${id}`),
//           method: "PUT",
//           body: JSON.stringify(data),
//         }),
//       }),
//       delete: build.mutation({
//         query: (id) => ({
//           url: createEndpointUrl(`${endpoints.delete}/${id}`),
//           method: "DELETE",
//         }),
//       }),
//     }),
//   });
// };

// // Example usage for an "applicant" entity
// const applicantApis = crudApi({
//   entityName: "applicant",
//   baseUrl: "/Applicant", // Base URL for the entity's API
//   endpoints: {
//     list: "List", // List endpoint
//     create: "CreateApplicant", // Create endpoint
//     update: "UpdateApplicant", // Update endpoint
//     delete: "DeleteApplicant", // Delete endpoint
//   },
// });

// export const {
//   useGetListQuery,
//   useCreateMutation,
//   useUpdateMutation,
//   useDeleteMutation,
// } = applicantApis;
