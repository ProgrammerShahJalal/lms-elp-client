import { baseApi } from "./baseApi";



export const BOOKS_URL = "/books";

export const booksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // all Books
    getAllBooks: build.query({
      query: (arg) => {
        return {
          url: BOOKS_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          books: response,
          meta,
        };
      },
      providesTags: ["books"],
    }),

    getSingleBook: build.query({
      query: (id) => ({
        url: `${BOOKS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["books"],
    }),
    addBooks: build.mutation({
      query: (data) => ({
        url: BOOKS_URL,
        method: "POST",
        contentType:"multipart/form-data",
        data: data,
      }),
      invalidatesTags: ["books"],
    }),



  }),
});

export const { useGetAllBooksQuery, useGetSingleBookQuery, useAddBooksMutation } = booksApi;
