import api from "../api/baseApi";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (page) => ({
        url: `/user-managements/?page=${page}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllUsersQuery } = userApi;
