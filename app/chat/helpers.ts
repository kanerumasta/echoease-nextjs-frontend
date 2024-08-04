import { TConversationSchema } from "@/schemas/chat-schemas";

export const filterConversations = (conversations:TConversationSchema[], currentUserEmail:string):TConversationSchema[] => {
    return conversations.map(conversation => {
        const filteredUsers = conversation.users.filter((user)=>user.email !== currentUserEmail)

        return {
            ...conversation,
            users: filteredUsers
        }
        
        
    });
   
   
}