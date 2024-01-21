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

        getMyCourseVedioPlaylist: build.query({
            query: (course_id) => {
                return {
                    url: `${COURSE_PLAYLIST}/course/${course_id}`,
                    method: "GET",
                   
                };
            },
           
            providesTags: ["course-playlists"],
        }),
        getSingleCoursePlaylist: build.query({
            query: (id) => ({
              url: `${COURSE_PLAYLIST}/${id}`,
              method: "GET",
            }),
            providesTags: ["course-playlists"],
          }),



        addPlaylistVideo: build.mutation({
            query: (data) => ({
                url: COURSE_PLAYLIST,
                method: "POST",
                data: data,
            }),
            invalidatesTags: ["course-playlists"],
        }),

        deleteVideoPlaylist: build.mutation({
            query: (id) => ({
              url: `${COURSE_PLAYLIST}/${id}`,
              method: 'DELETE'
            }),
            invalidatesTags: ['course-playlists']
          })
    }),
});

export const {  useAddPlaylistVideoMutation,useGetSingleCoursePlaylistQuery, useGetMyCourseVedioPlaylistQuery, useGetAllPlaylistQuery, useDeleteVideoPlaylistMutation } = makeQuizApi;
