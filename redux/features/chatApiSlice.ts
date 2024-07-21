import { apiSlice } from "../services/apiSlice";

const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        retrieveChats: builder.query<any, void>({
            query: () => "/chat/",
        }),
        retrieveChatMessages: builder.query({
            query: (code:string)=>`/chat/${code}/messages`
        })
    }),
});

export const { useRetrieveChatsQuery, useRetrieveChatMessagesQuery } = chatApiSlice;
