import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY || 'c41772d361msh2a66d7c2598dafcp1ae37fjsn1776032875f5';
console.log("rapidApiKey:", rapidApiKey);

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', rapidApiKey);
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: ({ articleUrl }) => {
                const encodedUrl = encodeURIComponent(articleUrl);
                return `summarize?url=${encodedUrl}&length=3`;
            },
        }),
    }),
});

export const { useLazyGetSummaryQuery } = articleApi;
