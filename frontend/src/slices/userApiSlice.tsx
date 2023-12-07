import { apiSlice } from "./apiSlice.js";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (build: any) => ({
    login: build.mutation({
      query: (data: any) => ({
        url: "/api/login", // Login user
        method: "POST",
        body: data,
      }),
    }),
    createUser: build.mutation({
      query: (data: any) => ({
        url: "/api/users/create-user", // Create user
        method: "POST",
        body: data,
      }),
    }),
    logout: build.mutation({
      query: (data: any) => ({
        url: "/api/users/logout", // Logout user
        method: "POST",
        body: data,
      }),
    }),
    getUsers: build.query({
      query: () => ({
        url: "/api/users", // Fetch all users
        method: "GET",
      }),
    }),
    updateUser: build.mutation({
      query: ({ data, userId }: any) => ({
        url: `/api/users/${userId}`, // Update user by user ID
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: build.mutation({
      query: (userId: any) => ({
        url: `/api/users/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useCreateUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
