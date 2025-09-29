import api from "../api/baseApi";

const categoryUnitTypeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => ({
        url: "/categories/",
        method: "GET",
      }),
    }),

    // units & type
    getAllUnitOrType: builder.query({
      query: (key) => ({
        url: `/unit-type?key=${key}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllCategoryQuery, useGetAllUnitOrTypeQuery } =
  categoryUnitTypeApi;
