import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { SetAccessToken } from "./auth/authSlice";

const rawBaseQuery = fetchBaseQuery({
  // baseUrl: 'https://paulina-e-learning-platform.vercel.app/api/v1',
  baseUrl: "http://56.228.50.160:6080/api/v1",

  prepareHeaders: (headers, { getState }) => {
    const state = getState();
    const token = state.auth?.accessToken;

    if (token) {
      headers.set("Authorization", `${token}`);
    }
    return headers;
  },
});

// Wrap baseQuery to handle 401 globally
const baseQuery = async (
  args,
  api,
  extraOptions
) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  const status = result?.error?.status;

  if (status === 401 || status === 403) {
    api.dispatch(SetAccessToken(null));
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,

  tagTypes: [
    "PROFILE",
  ],
  endpoints: () => ({}),
});
