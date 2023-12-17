import { baseApi } from "./baseApi";

export const SUBCATEGORIES_URL = "/sub-categories";

export const subcategoryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllSubcategories: build.query({
            query: (arg) => ({
                url: SUBCATEGORIES_URL,
                method: "GET",
                params: arg,
            }),
            transformResponse: (response, meta) => {
                return {
                    subcategories: response.data,
                    meta,
                };
            },
            providesTags: ["sub-categories"],
        }),
    }),
});

export const { useGetAllSubcategoriesQuery } = subcategoryApi;
