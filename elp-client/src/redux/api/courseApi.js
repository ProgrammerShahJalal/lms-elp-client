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
  

    
  }),
});

export const { useGetAllCoursesQuery, useGetSingleCourseQuery  } = courseApi;
