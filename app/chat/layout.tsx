"use client"

import { useFetchChatsQuery } from "@/redux/features/chatApiSlice";
import React from "react";


export default function Layout({ children }: { children: React.ReactNode }) {
  const {data:chats, isLoading} = useFetchChatsQuery()
  console.log(chats)
   return <div>

     {children}
   </div>
}
