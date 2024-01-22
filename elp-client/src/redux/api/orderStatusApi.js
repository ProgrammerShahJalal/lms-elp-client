import { baseApi } from "./baseApi";

export const ORDER_STATUS = "/order-statuses";


export const orderStatusApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // all courses
    getAllOrderStatus: build.query({
      query: (arg) => {
        return {
          url: ORDER_STATUS,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          allStatus: response,
          meta,
        };
      },
      providesTags: ["order-status"],
    }),

    // getAllCoursesRoutine: build.query({
    //   query: (arg) => {
    //     return {
    //       url: `${COURSES_URL}/routines`,
    //       method: "GET",
    //       params: arg,
    //     };
    //   },
    //   transformResponse: (response, meta) => {
    //     return {
    //       routines: response,
    //       meta,
    //     };
    //   },
    //   providesTags: ["courses"],
    // }),

    // getSingleCourse: build.query({
    //   query: (id) => ({
    //     url: `${COURSES_URL}/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["courses"],
    // }),
    // addCourse: build.mutation({
    //   query: (data) => ({
    //     url: COURSES_URL,
    //     method: "POST",
    //     contentType: "multipart/form-data",
    //     data: data,
    //   }),
    //   invalidatesTags: ["courses"],
    // }),
    // deleteCourses: build.mutation({
    //   query: (categoryId) => ({
    //     url: `${COURSES_URL}/${categoryId}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["courses"],
    // }),

   
  }),
});

export const {
  useGetAllOrderStatusQuery
} = orderStatusApi;
