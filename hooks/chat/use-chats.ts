"use client";

import { useRetrieveChatsQuery } from "@/redux/features/chatApiSlice";

export default function useChats() {
    const {data, isLoading} = useRetrieveChatsQuery();

    return  {data, isLoading} ;
}
