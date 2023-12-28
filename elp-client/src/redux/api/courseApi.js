import { baseApi } from "./baseApi";



export const COURSES_URL = "/courses";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // all courses
    getAllCourses: build.query({
      query: (arg) => {
        return {
          url: COURSES_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          courses: response,
          meta,
        };
      },
      providesTags: ["courses"],
    }),

    getSingleCourse: build.query({
      query: (id) => ({
        url: `${COURSES_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["courses"],
    }),
    addCourse: build.mutation({
      query: (data) => ({
        url: COURSES_URL,
        method: "POST",
        contentType:"multipart/form-data",
        data: data,
      }),
      invalidatesTags: ["courses"],
    }),
    deleteCourses: build.mutation({
      query: (categoryId) => ({
        url: `${COURSES_URL}/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["courses"],
    }),


  }),
});

export const { useGetAllCoursesQuery, useGetSingleCourseQuery, useAddCourseMutation, useDeleteCoursesMutation } = courseApi;
