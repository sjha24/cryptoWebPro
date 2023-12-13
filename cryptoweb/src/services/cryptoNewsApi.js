import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com';

const cryptoNewsHeaders = {
  'X-RapidAPI-Key': '2c98ddec48msh792ac5d0036e9edp195b03jsn13c73a8513e1',
  'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com',
};

const createRequest = (url) => ({
  url,
  headers: cryptoNewsHeaders,
});

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: (count) => createRequest(`/v1/coindesk?limit=${count}`),
    }),
  }),
});

export const{useGetCryptoNewsQuery}=cryptoNewsApi