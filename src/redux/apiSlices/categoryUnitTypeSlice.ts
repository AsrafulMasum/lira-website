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

    // units & type
    getAllUnitOrType: builder.query({
      query: (key) => ({
        url: `/unit-type?key=${key}`,
        method: "GET",
      }),
      providesTags: ["UnitOrType"],
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

    updateGroup: builder.mutation({
      query: (data) => ({
        url: `/groups/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Group"],
    }),

    deleteGroup: builder.mutation({
      query: (groupId) => ({
        url: `/groups/delete/${groupId}`,
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

  // unit & type
  useGetAllUnitOrTypeQuery,

  //group
  useGetAllGroupQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} = categoryUnitTypeApi;
