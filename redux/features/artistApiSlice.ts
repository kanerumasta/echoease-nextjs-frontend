import { ArtistSchema, GenreSchema } from "@/schemas";
import { z } from "zod";
import { apiSlice } from "../services/apiSlice";

const artistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createArtistApplication: builder.mutation<void, any>({
      query: (data: any) => ({
        method: "POST",
        url: "/artists/applications/",

        body: data,
      }),
    }),

    fetchListArtists: builder.query<z.infer<typeof ArtistSchema>[], void>({
      query: () => "/artists",
    }),
    fetchDetailArtistBySlug: builder.query<
      z.infer<typeof ArtistSchema>,
      string
    >({
      query: (slug: string) => `/artists/slug/${slug}`,
    }),
    fetchGenres: builder.query<z.infer<typeof GenreSchema>[], void>({
      query: () => "/artists/genres/",
    }),
  }),
});

export const {
  useCreateArtistApplicationMutation,
  useFetchListArtistsQuery,
  useFetchDetailArtistBySlugQuery,
  useFetchGenresQuery,
} = artistApiSlice;
