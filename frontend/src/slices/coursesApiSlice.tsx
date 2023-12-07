import { apiSlice } from "./apiSlice.js";

export const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (build: any) => ({
    createCourse: build.mutation({
      query: (data: any) => ({
        url: "/api/courses/create-course",
        method: "POST",
        body: data,
      }),
    }),
    getCourses: build.query({
      query: () => ({
        url: `/api/courses/get-courses`,
        method: "GET",
      }),
    }),
    assignCourse: build.mutation({
      query: (data: any) => ({
        url: `/api/assignments/assign-course`,
        method: "POST",
        body: data,
      }),
    }),
    updateCourse: build.mutation({
      query: ({ data, courseId }: any) => ({
        url: `/api/courses/${courseId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteCourse: build.mutation({
      query: (courseId: any) => ({
        url: `/api/courses/${courseId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCoursesQuery,
  useAssignCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = coursesApiSlice;
