import { baseApi } from "./baseApi";




export const CART_URL = "/carts";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // all carts
    getAllCarts: build.query({
      query: (arg) => {
        return {
          url: CART_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          carts: response,
          meta,
        };
      },
      providesTags: ["carts"],
    }),
    getAllCartsByUser: build.query({
      query: (arg) => {
        return {
          url: `${CART_URL}/my-cart`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          carts: response,
          meta,
        };
      },
      providesTags: ["carts"],
    }),

    // getSingleBook: build.query({
    //   query: (id) => ({
    //     url: `${BOOKS_URL}/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["books"],
    // }),
    addToCart: build.mutation({
      query: (data) => ({
        url: CART_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["carts"],
    }),
    // deleteBooks: build.mutation({
    //   query: (categoryId) => ({
    //     url: `${BOOKS_URL}/${categoryId}`,
    //     method: 'DELETE'
    //   }),
    //   invalidatesTags: ['books']
    // })
    


  }),
});

export const {useAddToCartMutation , useGetAllCartsQuery, useGetAllCartsByUserQuery} = cartApi;
