import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_SERVER } from "config/constant";


const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_SERVER }),
  endpoints: () => ({}),
})

export default emptySplitApi