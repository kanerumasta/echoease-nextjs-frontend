"use client"

import { filterConversations } from "@/app/chat/helpers";
import { useFetchChatsQuery } from "@/redux/features/chatApiSlice";
import { TConversationSchema } from "@/schemas/chat-schemas";
import React from "react";

export default function ChatList() {
    
    const {data:conversations, isLoading} = useFetchChatsQuery()
    if(isLoading){
        return <div>Loading</div>
    }
    const filteredConversations = filterConversations(conversations, "macrinaibale@gmail.com")
   
    return (
        <div className="flex">
            <div className="h-[600px] bg-white w-[400px]">
                {filteredConversations.map((conversation:TConversationSchema)=>(
                    <div key={conversation.code}>
                        {conversation.users.map(user=>(
                            <p key={user.email}>{user.first_name}</p>
                        ))}
                    </div>
                    
                ))}
            </div>
     
        </div>
    );
}
