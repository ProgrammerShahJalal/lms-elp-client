import { baseApi } from "./baseApi";

export const QUESTIONS_URL = "/questions";

export const questionsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllQuestions: build.query({
            query: (arg) => ({
                url: QUESTIONS_URL,
                method: "GET",
                params: arg,
            }),
            transformResponse: (response, meta) => {
                return {
                    categories: response,
                    meta,
                };
            },
            providesTags: ["questions"],
        }),
        deleteQuestions: build.mutation({
            query: (categoryId) => ({
                url: `${QUESTIONS_URL}/${categoryId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["questions"],
        }),


    }),
});

export const { useGetAllQuestionsQuery, useDeleteQuestionsMutation } = questionsApi;