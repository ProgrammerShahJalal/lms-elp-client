import { baseApi } from "./baseApi";



export const EXAM_RESULT = "/exam-results";

export const resultApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
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

export const { useSubmitExamUserMutation } = resultApi;
