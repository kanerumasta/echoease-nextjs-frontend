"use client";

import { Textarea } from "@/components/ui/textarea";
import { useChatMessages } from "@/hooks/chat";
import { useFetchUserQuery } from "@/redux/features/authApiSlice";
import {
  useFetchChatByCodeQuery,
  useFetchMessagesQuery,
} from "@/redux/features/chatApiSlice";
import { MessageSchema } from "@/schemas";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { MdSend } from "react-icons/md";
import { getChatPartner } from "@/utils";

export default function ChatContent() {
  const params = useParams<{ code: string }>();
  const textAreaRef = useRef<HTMLTextAreaElement|null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const currenUser = useFetchUserQuery();
  const currentChat = useFetchChatByCodeQuery(params.code);
  const { data, isLoading, isSuccess } = useFetchMessagesQuery(params.code);
  const wsURL = `${process.env.NEXT_PUBLIC_CHAT_WEBSOCKET}/${params.code}/`;
  const chatWebsocket = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<
    z.infer<typeof MessageSchema>[] | []
  >([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (scrollRef.current) {
      scrollToBottom(scrollRef.current);
    }
  }, [messages]);

  useEffect(() => {
    if (isSuccess) {
      setMessages(data);
    }
  }, [isSuccess]);

  useEffect(() => {
    const socket = new WebSocket(wsURL);
    socket.onopen = () => {
      toast.success("Connected..");
    };
    socket.onclose = () => console.log("Socket Disconnected..");
    socket.onmessage = (event) => {
      try {
        const newMessage = MessageSchema.safeParse(JSON.parse(event.data));
        if (newMessage.success) {
          setMessages((prevMessages) => [...prevMessages, newMessage.data]);
        } else {
          console.log("Error parsing message | Zod");
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
    chatWebsocket.current = socket;

    return () => socket.close();
  }, [wsURL]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const scrollToBottom = (container: HTMLDivElement) => {
    container.lastElementChild?.scrollIntoView({
      behavior: "instant",
      block: "end",
      inline: "nearest",
    });
  };

  return (
    <div className="">
      <div className="bg-gray-200 h-[50px]">
        <span>
          {currentChat.data &&
            getChatPartner(currentChat.data, currenUser.data?.email)}
        </span>
      </div>
      <div
        ref={scrollRef}
        className=" bg-indigo-100 h-[75vh] overflow-y-scroll min-w-[600px] border-[1px] rounded-md p-2 flex flex-col"
      >
        {messages?.map((message) => (
          <div
            key={message.id}
            className={cn("flex", {
              "justify-end": message.author === currenUser.data?.email,
            })}
          >
            <p
              className={cn(
                "p-2 max-w-[70%] break-words text-wrap whitespace-pre-wrap my-2 rounded-lg",
                {
                  "bg-indigo-500": message.author === currenUser.data?.email,
                  "bg-gray-200": message.author !== currenUser.data?.email,
                }
              )}
            >
              {message.content}
            </p>
          </div>
        ))}
      </div>
      <div className="flex 0 p-4  items-center">
        
        <textarea

         rows={1}
         
          className="h-8 resize-none w-full outline-0 border-0 focus:border-0 focus:outline-none"
          ref={textAreaRef}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter your message here..."
        />
        <button
          onClick={() => {
            if(newMessage.length === 0 && textAreaRef.current){
              textAreaRef.current.focus()
            }
            if (chatWebsocket.current && newMessage.length > 0) {
              chatWebsocket.current.send(newMessage);
              setNewMessage("");
              if (textAreaRef.current) {
                (textAreaRef.current).focus();
              }
            }
          }}
        >
          <MdSend className="mx-2" color="indigo" size={30} />
        </button>
      </div>
    </div>
  );
}
