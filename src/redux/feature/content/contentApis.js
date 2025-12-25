import { baseApi } from "../baseApi";

const contentApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContent: builder.query({
      query: () => ({
        url: "/content",
        method: "GET",
      }),
      providesTags: ["CONTENT"],
    }),

    updateContent: builder.mutation({
      query: (data) => ({
        url: "/content",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["CONTENT"],
    }),
  }),
});

export const { useGetContentQuery, useUpdateContentMutation } = contentApis;
