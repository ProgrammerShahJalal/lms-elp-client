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
      query: (id) => ({
        url: `${ORDER_STATUS}/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["order-status"]
    }),
    
   

   
  }),
});

export const {
  useGetAllOrderStatusQuery, useOrderStatusChangeMutation
} = orderStatusApi;
