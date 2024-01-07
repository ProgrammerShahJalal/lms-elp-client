import { baseApi } from "./baseApi";
export const USERS_URL = "/users";
export const SHIPPING_ADDRESS_URL = "/shipping-addresses";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // all courses
    getAllUsers: build.query({
      query: (arg) => {
        return {
          url: USERS_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: ["users"],
    }),
    makeAdmin: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PATCH",
        data: { role: "admin" },
      }),
      invalidatesTags: ["users"],
    }),
    getMyShippingAddress: build.query({
      query: () => ({
        url: `${SHIPPING_ADDRESS_URL}/my-shipping-address`,
        method: "GET",
      }),
      providesTags: ["shipping-addresses"],
    }),
    addShippingAddress: build.mutation({
      query: (data) => ({
        url: `${SHIPPING_ADDRESS_URL}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["shipping-addresses"],
    }),
    updateShippingAddress: build.mutation({
      query: (payload) => ({
        url: `${SHIPPING_ADDRESS_URL}/update`,
        method: "PATCH",
        data: payload,
      }),

      invalidatesTags: ["shipping-addresses"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useMakeAdminMutation,
  useAddShippingAddressMutation,
  useGetMyShippingAddressQuery,
  useUpdateShippingAddressMutation,
} = usersApi;
