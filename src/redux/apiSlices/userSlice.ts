import api from "../api/baseApi";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ page, limit = 10 }) => ({
        url: `/user-managements/?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    changeUserStatus: builder.mutation({
      query: ({ userId, status }) => ({
        url: `/user-managements/status/${userId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
  useChangeUserStatusMutation,
} = userApi;
