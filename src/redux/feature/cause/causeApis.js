import { baseApi } from "../baseApi";

const dashboardApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET CAUSE REPORT
        getAllCause: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    Object.entries(args).forEach(([key, value]) => {
                        if (value !== undefined && value !== null && value !== "") {
                            params.append(key, value);
                        }
                    });
                }
                return {
                    url: "/cause",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["CAUSE"],
        }),

        // GET CAUSE CATEGORIES
        getCauseCategories: builder.query({
            query: () => ({
                url: "/cause/categories",
                method: "GET",
            }),
        }),

        updateCause: builder.mutation({
            query: ({ id, payload }) => ({
                url: `/cause/${id}`,
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["CAUSE"],
        }),

        // CHANGE CAUSE STATUS
        changeCauseStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/cause/${id}/status`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: ["CAUSE"],
        }),

        // CREATE CAUSE
        createCause: builder.mutation({
            query: (payload) => ({
                url: "/cause",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["CAUSE"],
        }),


    }),
});

export const {
    useGetAllCauseQuery,
    useGetCauseCategoriesQuery,
    useUpdateCauseMutation,
    useChangeCauseStatusMutation,
    useCreateCauseMutation,
} = dashboardApis