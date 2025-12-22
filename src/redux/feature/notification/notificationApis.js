
import { baseApi } from "../baseApi";

const notificationApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotifications: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
              params.append(key, String(value));
            }
          });
        }
        return {
          url: "/notification/me",
          method: "GET",
          params,
        };
      },
      providesTags: ["NOTIFICATION"],
    }),

    markNotificationSeen: builder.mutation({
      query: (id) => ({
        url: `/notification/mark-notification/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["NOTIFICATION"],
    }),

    getUnseenNotificationCount: builder.query({
      query: () => ({
        url: "/notification/unseen-notification-count",
        method: "GET",
      }),
      providesTags: ["NOTIFICATION"],
    }),
  }),
});

export const {
  useGetMyNotificationsQuery,
  useMarkNotificationSeenMutation,
  useGetUnseenNotificationCountQuery,
} = notificationApis;

