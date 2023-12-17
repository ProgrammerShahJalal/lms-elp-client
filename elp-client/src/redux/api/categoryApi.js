import { baseApi } from "./baseApi";

export const CATEGORIES_URL = "/categories";

export const categoryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllCategories: build.query({
            query: (arg) => ({
                url: CATEGORIES_URL,
                method: "GET",
                params: arg,
            }),
            transformResponse: (response, meta) => {
                return {
                    categories: response,
                    meta,
                };
            },
            providesTags: ["categories"],
        }),
    }),
});

export const { useGetAllCategoriesQuery } = categoryApi;