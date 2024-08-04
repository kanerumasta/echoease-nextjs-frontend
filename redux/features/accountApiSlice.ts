import { apiSlice } from "../services/apiSlice";
import { TProfileSchema } from "@/schemas/user-schemas";

const AccountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation<void, TProfileSchema>({
      query: (profileData) => ({
        url: "/account/",
        method: "PUT",
        body: profileData,
      }),
    }),
  }),
});

export const { useUpdateProfileMutation } = AccountApiSlice;
