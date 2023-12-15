import { baseApi } from "./baseApi";

export const USERS_URL = "/users";
export const COURSES_URL = "/courses";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userSignup: build.mutation({
      query: (loginData) => ({
        url: USERS_URL,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: ["users"],
    }),
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: ["users"],
    }),
    

     // get all tasks
     getCourses: build.query({
      query: () => ({
        url: COURSES_URL,
      }),
      providesTags: ['courses'],
    }),
  }),
});

export const { useUserSignupMutation, useUserLoginMutation, useGetCoursesQuery } = authApi;
