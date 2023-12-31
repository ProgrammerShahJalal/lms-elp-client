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
      transformResponse: (response) => {
        return {
          exams: response,
          meta: response.meta,
        };
      },
      providesTags: ["exams"],
    }),
    payForExam: build.mutation({
      query: (data) => ({
        url: "/exam-payments",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["exam-payments"],
    }),
  }),
});

export const { useGetAllExamsQuery, usePayForExamMutation } = examsApi;
