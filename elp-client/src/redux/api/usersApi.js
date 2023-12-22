import { baseApi } from "./baseApi";
export const COURSES_URL = "/users";

export const usersApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // all courses
        getAllUsers: build.query({
            query: (arg) => {
                return {
                    url: COURSES_URL,
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
                url: `${COURSES_URL}/${data.userId}`,
                method: "PATCH",
                data: { role: "admin" },
            }),
            invalidatesTags: ["users"],
        }),



    }),
});

export const { useGetAllUsersQuery, useMakeAdminMutation } = usersApi;
