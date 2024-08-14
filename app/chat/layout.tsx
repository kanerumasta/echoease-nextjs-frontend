

import { ChatLayout } from "@/components/chat"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ChatLayout>
      {children}
    </ChatLayout>
  )
}
