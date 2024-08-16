import { z } from "zod";
import { apiSlice } from "../services/apiSlice";
import { ArtistSchema } from "@/schemas";


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
    fetchListArtists : builder.query<z.infer<typeof ArtistSchema>[], void>({
      query: ()=>"/artists"
    })
  }),
});

export const {
  useCreateArtistApplicationMutation,
  useFetchMyArtistProfileQuery,
  useFetchListArtistsQuery
} = artistApiSlice;
