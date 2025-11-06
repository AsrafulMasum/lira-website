import api from "../api/baseApi";

const communityApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCommunityPosts: builder.query({
      query: () => ({
        url: `/community/posts`,
        method: "GET",
      }),
      providesTags: ["communityPosts"],
    }),

    changeCommunityPostStatus: builder.mutation({
      query: ({ postId, status }) => ({
        url: `/community/approve/${postId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["communityPosts"],
    }),
  }),
});

export const {
  useGetCommunityPostsQuery,
  useChangeCommunityPostStatusMutation,
} = communityApi;
