import { apiSlice } from "../services/apiSlice";

const artistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createArtistApplication: builder.mutation<void, any>({
      query: (data: any) => ({
        method: "POST",
        url: "/artists/apply/",
        body: data,
      }),
    }),
    fetchMyArtistProfile: builder.query<any,void>({
      query: () => "/artists/my-artist-profile/",
    }),
  }),
});

export const {
  useCreateArtistApplicationMutation,
  useFetchMyArtistProfileQuery,
} = artistApiSlice;
