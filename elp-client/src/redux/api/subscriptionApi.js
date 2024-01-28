import { baseApi } from "./baseApi";
export const SUBSCRIPTION_URL = "/subscriptions";


export const subscriptionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllSubscription: build.query({
            query: (arg) => ({
                url: SUBSCRIPTION_URL,
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
        addSubscription: build.mutation({
            query: (data) => ({
                url: SUBSCRIPTION_URL,
                method: "POST",
                data: data,
            }),
            invalidatesTags: ["exams"],
        }),



    }),
});

export const { useGetAllSubscriptionQuery, useAddSubscriptionMutation } = subscriptionApi;