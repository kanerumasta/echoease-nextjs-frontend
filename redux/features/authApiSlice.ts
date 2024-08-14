import { z } from "zod";
import { apiSlice } from "../services/apiSlice";
import { ResetPasswordConfirmSchema, UserSchema } from "@/schemas";

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

interface SocialAuthArgs {
  provider: string;
  state: string;
  code: string;
}

interface CreateUserResponse {
  success: boolean;
  user: User;
}

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.query<z.infer<typeof UserSchema>, void>({
      query: () => "/users/me",
    }),
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: "/jwt/create/",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: { email, password },
      }),
    }),
    registerNewUser: builder.mutation({
      query: ({ first_name, last_name, email, password, re_password }) => ({
        url: "/users/",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: { first_name, last_name, email, password, re_password },
      }),
    }),
    verifyUser: builder.mutation<any, void>({
      query: () => ({
        url: "/jwt/verify/",
        method: "POST",
      }),
    }),
    logoutUser: builder.mutation<any, void>({
      query: () => ({
        url: "/logout/",
        method: "POST",
      }),
    }),
    activation: builder.mutation({
      query: ({ uid, token }) => ({
        url: "/users/activation/",
        method: "POST",
        body: { uid, token },
      }),
    }),
    resetPassword: builder.mutation({
      query: (email) => ({
        url: "/users/reset_password/",
        method: "POST",
        body: { email },
      }),
    }),
    resetPasswordConfirm: builder.mutation({
      query: ({
        uid,
        token,
        new_password,
        re_new_password,
      }: z.infer<typeof ResetPasswordConfirmSchema>) => ({
        url: "/users/reset_password_confirm/",
        method: "POST",
        body: { uid, token, new_password, re_new_password },
      }),
    }),
    socialAuthenticate: builder.mutation<CreateUserResponse, SocialAuthArgs>({
      query: ({ provider, state, code }) => ({
        url: `/o/${provider}/?state=${encodeURIComponent(
          state
        )}&code=${encodeURIComponent(code)}`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "x-www-form-urlencoded",
        },
      }),
    }),
  }),
});

export const {
  useFetchUserQuery,
  useLoginUserMutation,
  useSocialAuthenticateMutation,
  useActivationMutation,
  useLogoutUserMutation,
  useRegisterNewUserMutation,
  useVerifyUserMutation,
  useResetPasswordConfirmMutation,
  useResetPasswordMutation,
} = authApiSlice;
