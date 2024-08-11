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
  }),
});

export const { useCreateArtistApplicationMutation } = artistApiSlice;
