import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_SERVER } from "config/constant";
import { responseInterceptor } from './utils';


const baseQuery = fetchBaseQuery({ baseUrl: API_SERVER });

const emptySplitApi = createApi({
  baseQuery: responseInterceptor(baseQuery),
  endpoints: () => ({}),
});


export default emptySplitApi