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
                    exams: response,
                    meta,
                };
            },
            providesTags: ["exams"],
        }),

        getSingleExam: build.query({
            query: (id) => ({
              url: `${EXAMS_URL}/${id}`,
              method: "GET",
            }),
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

        deleteExam: build.mutation({
            query: (id) => ({
              url: `${EXAMS_URL}/${id}`,
              method: "DELETE",
            }),
            invalidatesTags: ["exams"],
          }),
    }),
});

export const { useGetAllExamsQuery ,useGetSingleExamQuery, useDeleteExamMutation ,useAddAllExamsMutation} = examsApi;