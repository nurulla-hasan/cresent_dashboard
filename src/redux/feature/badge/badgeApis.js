import { baseApi } from "../baseApi";

const badgeApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET BADGE REPORT
    getBadgeReport: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            if (value) {
              params.append(key, value);
            }
          });
        }
        return {
          url: "/badges",
          method: "GET",
          params,
        };
      },
      providesTags: ["BADGE"],
    }),

    // GET SINGLE BADGE
    getSingleBadge: builder.query({
      query: (id) => ({
        url: `/badges/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "BADGE", id }],
    }),

    // CREATE BADGE
    createBadge: builder.mutation({
      query: (data) => ({
        url: "/badges",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BADGE"],
    }),

    // UPDATE BADGE
    updateBadge: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/badges/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "BADGE",
        { type: "BADGE", id },
      ],
    }),

    // DELETE BADGE
    deleteBadge: builder.mutation({
      query: (id) => ({
        url: `/badges/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BADGE"],
    }),
  }),
});

export const {
  useGetBadgeReportQuery,
  useGetSingleBadgeQuery,
  useCreateBadgeMutation,
  useUpdateBadgeMutation,
  useDeleteBadgeMutation,
} = badgeApis;