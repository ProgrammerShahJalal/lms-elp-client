import { baseApi } from "./baseApi";

export const QUIZ_PLAYLIST = "/quiz-questions";
export const COURSE_PLAYLIST = "/course-playlists";

export const makeQuizApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addQuizPlaylist: build.mutation({
            query: (data) => ({
                url: QUIZ_PLAYLIST,
                method: "POST",
                data: data,
            }),
            invalidatesTags: ["quiz-questions"],
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

export const { useAddQuizPlaylistMutation, useAddPlaylistVideoMutation } = makeQuizApi;
