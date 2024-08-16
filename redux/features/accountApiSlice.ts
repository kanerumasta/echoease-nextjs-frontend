import { ArtistSchema } from "@/schemas";
import { apiSlice } from "../services/apiSlice";
import { z } from "zod";


const AccountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation<void, z.infer<typeof ArtistSchema>>({
      query: (profileData) => ({
        url: "/account/",
        method: "PUT",
        body: profileData,
      }),
    }),
  }),
});

export const { useUpdateProfileMutation } = AccountApiSlice;
