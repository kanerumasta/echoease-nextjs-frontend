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
    
    fetchListArtists : builder.query<z.infer<typeof ArtistSchema>[], void>({
      query: ()=>"/artists"
    }),
    fetchDetailArtistBySlug : builder.query<z.infer<typeof ArtistSchema>,string>({
      query: (slug:string)=>`/artists/slug/${slug}`
    })
  }),
});

export const {
  useCreateArtistApplicationMutation,
  useFetchListArtistsQuery,
  useFetchDetailArtistBySlugQuery
} = artistApiSlice;
