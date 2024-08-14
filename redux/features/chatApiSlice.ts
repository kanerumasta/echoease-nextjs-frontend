import { ChatSchema, MessageSchema } from "@/schemas";
import { apiSlice } from "../services/apiSlice";
import { z } from "zod";

const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchChats: builder.query<z.infer<typeof ChatSchema>[], void>({
      query: () => "/chat/",
    }),
    fetchMessages: builder.query<z.infer<typeof MessageSchema>[], string>({
      query: (code: string) => `/chat/${code}/messages`,
    }),
    fetchChatByCode : builder.query<z.infer<typeof ChatSchema>,string>({
      query : (code:string) => `/chat/${code}`
    })
  }),
});

export const { useFetchChatsQuery, useFetchMessagesQuery, useFetchChatByCodeQuery } = chatApiSlice;
