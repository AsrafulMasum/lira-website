import api from "../api/baseApi";

const contestApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getContests: builder.query({
      query: () => ({
        url: "/contest",
        method: "GET",
      }),
    }),

    createContest: builder.mutation({
      query: (data) => ({
        url: "/contest/create",
        method: "POST",
        body: data,
      }),
    }),

    deleteContest: builder.mutation({
      query: (id) => ({
        url: `contest/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetContestsQuery,
  useCreateContestMutation,
  useDeleteContestMutation,
} = contestApi;
