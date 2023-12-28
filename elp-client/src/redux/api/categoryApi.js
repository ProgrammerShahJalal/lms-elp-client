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
        addCategory: build.mutation({
            query: (data) => ({
                url: CATEGORIES_URL,
                method: "POST",
                contentType: "multipart/form-data",
                data: data,
            }),
            invalidatesTags: ["categories"],
        }),
        deleteCategory: build.mutation({
            query: (categoryId) => ({
                url: `${CATEGORIES_URL}/${categoryId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["categories"],
        }),

    }),
});

export const { useGetAllCategoriesQuery, useAddCategoryMutation, useDeleteCategoryMutation } = categoryApi;


// addCategory: build.mutation({
//     query: (data) => ({
//         url: CATEGORIES_URL,
//         method: "POST",
//         data: data,
//     }),
//     invalidatesTags: ["categories"],
// }),
