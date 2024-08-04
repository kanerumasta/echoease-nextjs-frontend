import { apiSlice } from "../services/apiSlice";

const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchChats: builder.query<any, void>({
            query: () => "/chat/",
        }),
        fetchMessages: builder.query({
            query: (code:string)=>`/chat/${code}/messages`
        })
    }),
});

export const { useFetchChatsQuery, useFetchMessagesQuery } = chatApiSlice;
