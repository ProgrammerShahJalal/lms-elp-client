import { baseApi } from "./baseApi";

export const QUIZ_PLAYLIST = "/questions";
export const COURSE_PLAYLIST = "/course-playlists";

export const makeQuizApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllPlaylist: build.query({
            query: (arg) => {
                return {
                    url: COURSE_PLAYLIST,
                    method: "GET",
                    params: arg,
                };
            },
            transformResponse: (response, meta) => {
                return {
                    courses: response,
                    meta,
                };
            },
            providesTags: ["course-playlists"],
        }),
        
        addPlaylistVideo: build.mutation({
            query: (data) => ({
                url: COURSE_PLAYLIST,
                method: "POST",
                data: data,
            }),
            invalidatesTags: ["users"],
        }),
    }),
});

export const {  useAddPlaylistVideoMutation, useGetAllPlaylistQuery } = makeQuizApi;
