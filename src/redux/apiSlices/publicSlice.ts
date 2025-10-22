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

    getAllFaq: builder.query({
      query: () => ({
        url: "/faqs",
        method: "GET",
      }),
      providesTags: ["faqs"],
    }),

    createFaq: builder.mutation({
      query: (data) => ({
        url: "/faqs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["faqs"],
    }),

    updateFaq: builder.mutation({
      query: ({ id, data }) => ({
        url: `/faqs/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["faqs"],
    }),

    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/faqs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["faqs"],
    }),

    getDashboardAnalytics: builder.query({
      query: (filters = {}) => {
        const { dateRange, category, gameType, userSegment, product, region } = filters;
        const queryParams = new URLSearchParams();
        
        if (dateRange && dateRange !== "all") queryParams.append("dateRange", dateRange);
        if (category && category !== "all") queryParams.append("category", category);
        if (gameType && gameType !== "all") queryParams.append("gameType", gameType);
        if (userSegment && userSegment !== "all") queryParams.append("userSegment", userSegment);
        if (product && product !== "all") queryParams.append("product", product);
        if (region && region !== "all") queryParams.append("region", region);
        
        const queryString = queryParams.toString();
        return {
          url: `/dashboard/analytics${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetAllHelpQuery,
  useUpdateHelpStatusMutation,
  useGetSettingsQuery,
  useAddSettingsMutation,

  useGetAllFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,

  useGetDashboardAnalyticsQuery,
} = publicApi;
