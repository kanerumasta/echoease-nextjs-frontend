import { z } from "zod";
import { apiSlice } from "../services/apiSlice";

const ArtistSchema = z.object({
  dob : z.string().date(),
  gender : z.string(),
  bio : z.string(),
  brgy:z.string(),
  city:z.string(),
  country:z.string(),
  profile_image : z.string(),
  cover_photo : z.string().nullable(),
  fb_page : z.string(),
  fb_profile_link : z.string(),
  id:z.number(),
  user:z.number(),
  phone : z.string(),
  slug : z.string(),
  street: z.string(),
  twitter : z.string(),
  zipcode : z.string()
})

const artistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createArtistApplication: builder.mutation<void, any>({
      query: (data: any) => ({
        method: "POST",
        url: "/artists/apply/",
        body: data,
      }),
    }),
    fetchMyArtistProfile: builder.query<z.infer<typeof ArtistSchema>,void>({
      query: () => "/artists/my-artist-profile/",
    }),
  }),
});

export const {
  useCreateArtistApplicationMutation,
  useFetchMyArtistProfileQuery,
} = artistApiSlice;
