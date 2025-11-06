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
  }),
});

export const { useGetCommunityPostsQuery } = communityApi;
