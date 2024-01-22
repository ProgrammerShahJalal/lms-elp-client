import { baseApi } from "./baseApi";



export const EXAM_RESULT = "/exam-results";

export const resultApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        examResult: build.query({
            query: (arg) => ({
                url: EXAM_RESULT,
                method: "GET",
                params: arg,
            }),
            transformResponse: (response) => {
                return {
                    exams: response,
                    meta: response.meta,
                };
            },
            providesTags: ["exams"],
        }),
        submitExamUser: build.mutation({
            query: (data) => ({
                url: EXAM_RESULT,
                method: "POST",
                data: data,
            }),
            invalidatesTags: ["exam-results"],
        }),


    }),
});

export const { useExamResultQuery, useSubmitExamUserMutation } = resultApi;
