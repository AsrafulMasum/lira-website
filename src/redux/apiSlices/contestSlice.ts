import api from "../api/baseApi";

const contestApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getContests: builder.query({
      query: () => ({
        url: "/contest",
        method: "GET",
      }),
      providesTags: ["contests"],
    }),

    getContestByCategoryId: builder.query({
      query: (categoryId) => ({
        url: `/contest/category/${categoryId}`,
        method: "GET",
      }),
      providesTags: ["contests"],
    }),

    createContest: builder.mutation({
      query: (data) => ({
        url: "/contest/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contests"],
    }),

    publishContest: builder.mutation({
      query: ({ contestId }) => ({
        url: `/contest/${contestId}/publish`,
        method: "PATCH",
      }),
      invalidatesTags: ["contests"],
    }),

    deleteContest: builder.mutation({
      query: (id) => ({
        url: `contest/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contests"],
    }),
  }),
});

export const {
  useGetContestsQuery,
  useGetContestByCategoryIdQuery,
  useCreateContestMutation,
  usePublishContestMutation,
  useDeleteContestMutation,
} = contestApi;
