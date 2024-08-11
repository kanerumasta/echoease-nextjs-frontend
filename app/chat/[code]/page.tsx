"use client"

import { useChatMessages } from "@/hooks/chat"
import { useFetchMessagesQuery } from "@/redux/features/chatApiSlice"
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"


export default function Page(){
    const params = useParams<{code:string}>()
    const {messages, isLoading} = useChatMessages(params.code)
    const wsURL=`${process.env.NEXT_PUBLIC_CHAT_WEBSOCKET}/${params.code}/`
    const chatWebsocket = useRef<WebSocket|null>(null)

    useEffect(()=>{
        const socket = new WebSocket(wsURL)
        socket.onopen = () => toast.success('Connected')
        socket.onclose = () => toast.error('Disconnected')
        socket.onmessage = (event) => {
            console.log(event.data)
        }
        chatWebsocket.current = socket
        

        return () => socket.close()
    },[wsURL])

    return <div>
        <button onClick={()=>{
            if(chatWebsocket.current){
                chatWebsocket.current.send("hahaha")
            }
        }}>Send</button>
    </div>
    
}