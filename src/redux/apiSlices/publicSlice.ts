import api from "../api/baseApi";

const publicApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllHelp: builder.query({
      query: ({ page, limit }) => ({
        url: `/help/?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["help"],
    }),

    updateHelpStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/help/resolved/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["help"],
    }),

    getSettings: builder.query({
      query: (key) => ({
        url: `/settings?key=${key}`,
        method: "GET",
      }),
      providesTags: ["settings"],
    }),

    addSettings: builder.mutation({
      query: (data) => ({
        url: `/settings`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["settings"],
    }),
  }),
});

export const {
  useGetAllHelpQuery,
  useUpdateHelpStatusMutation,
  useGetSettingsQuery,
  useAddSettingsMutation,
} = publicApi;
