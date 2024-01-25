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

    

   
    orderStatusChange: build.mutation({
      query: (data) => ({
        url: `${ORDER_STATUS}/${data?.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: ["order-status"],
    }),
    // orderStatusChange: build.mutation({
    //   query: ({ id, status }) => ({
    //     url: `${ORDER_STATUS}/${id}`,
    //     method: "PATCH",
    //     body: { status },
    //   }),
    //   invalidatesTags: ["order-status"],
    // }),
   

   
  }),
});

export const {
  useGetAllOrderStatusQuery, useOrderStatusChangeMutation
} = orderStatusApi;
