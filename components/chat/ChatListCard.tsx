
interface Conversation {
    name:string
}

interface ChatListCardProps{
    conversation:Conversation
}

export default function ChatListCard({conversation}:ChatListCardProps){
    return <div className="border-b-2 border-black border-solid  p-2">
        <h2>{conversation.name}</h2>
    </div>
}