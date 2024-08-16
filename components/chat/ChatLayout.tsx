"use client";

import { getChatPartner } from "@/utils";
import { useFetchUserQuery } from "@/redux/features/authApiSlice";
import { useFetchChatsQuery } from "@/redux/features/chatApiSlice";
import { ChatSchema } from "@/schemas";
import Link from "next/link";
import React from "react";
import { z } from "zod";
import { Avatar, AvatarImage } from "../ui/avatar";

export default function ChatList({ children }: { children: React.ReactNode }) {
  const { data: chats, isLoading } = useFetchChatsQuery();
  const currentUser = useFetchUserQuery();
  if (isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <div className="flex">
      <div className="w-[400px]">
        <div className="p-4">
        <h2 className="font-bold text-black text-xl">Messages</h2>
        </div>
        <ul className="h-full">
          {chats?.map((chat: z.infer<typeof ChatSchema>) => (
            <li className="hover:bg-gray-300 p-3" key={chat.code}>
              <Link href={`/chat/${chat.code}`}>
                <div className="flex px-2 gap-2 items-center">
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3N8ZW58MHx8MHx8fDA%3D" />
                  </Avatar>
                  <div>
                    <p className="text-black">{getChatPartner(chat, currentUser.data?.email)}</p>
                    <small className="text-black/20">This is a last message</small>
                  </div>
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
