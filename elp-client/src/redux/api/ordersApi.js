import { baseApi } from "./baseApi";

export const ORDERS_URL = "/orders";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addOrder: build.mutation({
      query: (data) => ({
        url: ORDERS_URL,
        method: "POST",
        data: data,
      }),
      providesTags: ["orders"],
    }),
    deleteSettings: build.mutation({
      query: (settings_id) => ({
        url: `${SETTINGS_URL}/${settings_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["settings"],
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetAllSettingsQuery,
  useDeleteSettingsMutation,
} = ordersApi;
