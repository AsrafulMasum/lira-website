import api from "../api/baseApi";

const contestApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getContests: builder.query({
      query: (params = {}) => {
        const {
          page = 1,
          limit = 10,
          search = "",
          status = "",
          categoryId = "",
        } = params;
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(search && { search }),
          ...(status && status !== "all" && { status }),
          ...(categoryId && categoryId !== "all" && { categoryId }),
        });

        return {
          url: `/contest?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["contests"],
    }),

    getContestById: builder.query({
      query: (contestId) => ({
        url: `/contest/contest/admin/${contestId}`,
        method: "GET",
      }),
      providesTags: ["contests"],
    }),

    changeContestStatus: builder.mutation({
      query: ({ contestId, data }) => ({
        url: `/contest/${contestId}/update-status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["contests"],
    }),

    updateContest: builder.mutation({
      query: ({ contestId, formData }) => ({
        url: `/contest/${contestId}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["contests"],
    }),

    getContestByCategoryId: builder.query({
      query: (categoryId) => ({
        url: `/contest/category/${categoryId}`,
        method: "GET",
      }),
      providesTags: ["contests"],
    }),

    getManualWinnerContest: builder.query({
      query: ({ page, limit }) => ({
        url: `/manually-winner-contest/pending?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["contests"],
    }),

    copyContest: builder.mutation({
      query: ({ contestId }) => ({
        url: `/contest/${contestId}/copy`,
        method: "POST",
      }),
      invalidatesTags: ["contests"],
    }),

    getContestDetails: builder.query({
      query: (contestId) => ({
        url: `manually-winner-contest/${contestId}/orders`,
        method: "GET",
      }),
      providesTags: ["contests"],
    }),

    createManualContestWinner: builder.mutation({
      query: ({ contestId, data }) => ({
        url: `/manually-winner-contest/${contestId}/determine-winners`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contests"],
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
  useGetManualWinnerContestQuery,
  useCopyContestMutation,
  useGetContestByIdQuery,
  useUpdateContestMutation,
  useChangeContestStatusMutation,
  useGetContestDetailsQuery,
  useCreateManualContestWinnerMutation,
  useCreateContestMutation,
  usePublishContestMutation,
  useDeleteContestMutation,
} = contestApi;
