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

    }),
});

export const { useGetAllExamsQuery } = examsApi;