import { baseApi } from "./baseApi";

export const COURSES_URL = "/courses";
export const COURSE_SUBSCRIPTIONS_URL = "/subscriptions";
export const COURSE_SUBSCRIPTIONS_HISTORY_URL = "/subscription-histories";

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
        contentType: "multipart/form-data",
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

    // alll subscript get
    getAllSubscriptions: build.query({
      query: (arg) => ({
        url: COURSE_SUBSCRIPTIONS_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          subscriptions: response,
          meta: response.meta,
        };
      },
      providesTags: ["subscriptions"],
    }),

    // alll subscript history get
    getAllCourseSubscriptionsHistory: build.query({
      query: (arg) => ({
        url: `${COURSE_SUBSCRIPTIONS_HISTORY_URL}/my-subscription-histories`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          courseSubscription: response,
          meta: response.meta,
        };
      },
      providesTags: ["subscription-histories"],
    }),
    subscribeToCourse: build.mutation({
      query: (data) => ({
        url: COURSE_SUBSCRIPTIONS_HISTORY_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["subscription-histories"],
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useGetSingleCourseQuery,
  useAddCourseMutation,
  useDeleteCoursesMutation,
  useGetAllSubscriptionsQuery,
  useSubscribeToCourseMutation,
  useGetAllCourseSubscriptionsHistoryQuery
} = courseApi;
