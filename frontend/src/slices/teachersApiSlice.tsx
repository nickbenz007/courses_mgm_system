import { apiSlice } from "./apiSlice.js";

export const teachersApiSlice = apiSlice.injectEndpoints({
  endpoints: (build: any) => ({
    getTeachers: build.query({
      query: () => ({
        url: `/api/teachers/get-all-teachers`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTeachersQuery } = teachersApiSlice;
