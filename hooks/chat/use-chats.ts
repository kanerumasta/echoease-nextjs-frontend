"use client";

import { useFetchChatsQuery } from "@/redux/features/chatApiSlice";

export default function useChats() {
    const {data, isLoading} = useFetchChatsQuery();

    return  {data, isLoading} ;
}
