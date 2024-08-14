"use client";

import { getChatPartner } from "@/utils";
import { useFetchUserQuery } from "@/redux/features/authApiSlice";
import { useFetchChatsQuery } from "@/redux/features/chatApiSlice";
import { ChatSchema } from "@/schemas";
import Link from "next/link";
import React from "react";
import { z } from "zod";

export default function ChatList({ children }: { children: React.ReactNode }) {
  const { data: chats, isLoading } = useFetchChatsQuery();
  const currentUser = useFetchUserQuery();
  if (isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <div className="flex">
      <div className="w-[400px]">
        <h2>My Chat List</h2>
        <ul>
          {chats?.map((chat: z.infer<typeof ChatSchema>) => (
            <li key={chat.code}>
              <Link href={`/chat/${chat.code}`}>
                <div className="bg-gray-300 p-4 my-2 rounded-md">
                  {getChatPartner(chat, currentUser.data?.email)}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {children}
    </div>
  );
}
