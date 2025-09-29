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
  }),
});

export const { useGetContestsQuery, useCreateContestMutation } = contestApi;
