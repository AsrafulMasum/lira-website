import api from "../api/baseApi";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (page) => ({
        url: `/user-managements/?page=${page}`,
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

export const { useGetAllUsersQuery, useChangeUserStatusMutation } = userApi;
