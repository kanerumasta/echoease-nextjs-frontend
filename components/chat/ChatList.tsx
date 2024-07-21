"use client"

import { useRetrieveChatsQuery } from "@/redux/features/chatApiSlice";

export default function ChatList() {
    const { data, isLoading } = useRetrieveChatsQuery();
    if (isLoading) return <div>Loading</div>;
    console.log(data)
    return <div></div>;
}
