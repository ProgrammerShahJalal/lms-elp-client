import { baseApi } from "./baseApi";

export const EXAMS_URL = "/exams";

export const examsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllExams: build.query({
            query: (arg) => ({
                url: EXAMS_URL,
                method: "GET",
                params: arg,
            }),
            transformResponse: (response, meta) => {
                return {
                    categories: response,
                    meta,
                };
            },
            providesTags: ["exams"],
        }),
        addAllExams: build.mutation({
            query: (data) => ({
                url: EXAMS_URL,
                method: "POST",
                data: data,
            }),
            invalidatesTags: ["exams"],
        }),
    }),
});

export const { useGetAllExamsQuery , useAddAllExamsMutation} = examsApi;