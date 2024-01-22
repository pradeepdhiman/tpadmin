import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_SERVER } from "config/constant";
import { responseInterceptor } from './utils';
import { _apiUrl } from 'config/constant';


const baseQuery = fetchBaseQuery({ baseUrl: _apiUrl });

const emptySplitApi = createApi({
  // baseQuery: responseInterceptor(baseQuery),
  baseQuery: baseQuery,
  endpoints: () => ({}),
});


export default emptySplitApi