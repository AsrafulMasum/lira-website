import api from "../api/baseApi";

const categoryUnitTypeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => ({
        url: "/categories/",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    getCategoriesByGroupId: builder.query({
      query: (groupId) => ({
        url: `categories/category-by-group/${groupId}`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: "/categories/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    shuffleCategory: builder.mutation({
      query: (data) => ({
        url: `categories/shuffle-serial`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation({
      query: (data) => ({
        url: `/categories/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/categories/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    // units & type
    getAllUnitOrType: builder.query({
      query: (key) => ({
        url: `/unit-type?key=${key}`,
        method: "GET",
      }),
      providesTags: ["UnitOrType"],
    }),

    createUnitOrType: builder.mutation({
      query: (data) => ({
        url: "/unit-type/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["UnitOrType"],
    }),

    updateUnitOrType: builder.mutation({
      query: (data) => ({
        url: `/unit-type/update/${data.id}`,
        method: "PATCH",
        body: { content: data.content },
      }),
      invalidatesTags: ["UnitOrType"],
    }),

    // group

    getAllGroup: builder.query({
      query: () => ({
        url: "/groups/",
        method: "GET",
      }),
      providesTags: ["Group"],
    }),

    createGroup: builder.mutation({
      query: (data) => ({
        url: "/groups/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Group"],
    }),

    shuffleGroupSerial: builder.mutation({
      query: (data) => ({
        url: `/groups/shuffle-group-serial`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Group"],
    }),

    updateGroup: builder.mutation({
      query: (data) => ({
        url: `/groups/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Group"],
    }),

    deleteGroup: builder.mutation({
      query: (groupId) => ({
        url: `/groups/${groupId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Group"],
    }),
  }),
});

export const {
  // category
  useGetAllCategoryQuery,
  useGetCategoriesByGroupIdQuery,
  useCreateCategoryMutation,
  useShuffleCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,

  // unit & type
  useGetAllUnitOrTypeQuery,
  useCreateUnitOrTypeMutation,
  useUpdateUnitOrTypeMutation,

  //group
  useGetAllGroupQuery,
  useCreateGroupMutation,
  useShuffleGroupSerialMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} = categoryUnitTypeApi;
