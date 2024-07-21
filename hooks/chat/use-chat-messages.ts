"use client"

import { useRetrieveChatMessagesQuery } from "@/redux/features/chatApiSlice"
import { useEffect, useState } from "react"

export default function useChatMessages (code:string) {
    const [messages, setMessages] = useState()
    
    const {data, isLoading} = useRetrieveChatMessagesQuery(code)

    useEffect(()=>{
        console.log(data)
    },[data])
    
    return {
        messages,
        setMessages,
        isLoading
    }
}