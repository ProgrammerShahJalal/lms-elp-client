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
        getSingleSubmissionExam: build.query({
            query: (id) => ({
                url: `${EXAM_RESULT}/${id}`,
                method: "GET",
            }),
            providesTags: ["exams"],
        }),
        submitExamUser: build.mutation({
            query: (data) => ({
                url: EXAM_RESULT,
                method: "POST",
                data: data,
            }),
            invalidatesTags: ["exams"],
        }),
        giveMarkToStudent: build.mutation({
            query: (data) => ({
                url: `${EXAM_RESULT}/${data.exam_id}`, // Update the URL to include the exam_id
                method: "PATCH",
                data: data,
            }),
            invalidatesTags: ["exams"],
        }),


    }),
});

export const { useExamResultQuery, useGetSingleSubmissionExamQuery, useSubmitExamUserMutation, useGiveMarkToStudentMutation } = resultApi;
