"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// ADD
type Tabs = 'portfolio'|'about'|'socials'


export default function EchoverseTab(){
    const [activeTab, setActiveTab] = useState<Tabs>("about")
    const path = usePathname()


    return path !== "/echoverse" && 
    (
        <ul className="w-full p-4 flex items-center justify-evenly">
        <li className={activeTab === "about" ? "bg-slate-800 text-white" : ''}>
            <Link onClick={()=>setActiveTab("about")} href={"/echoverse/about"}>About</Link>
        </li>
        <li className={activeTab === "portfolio" ? "bg-slate-800 text-white" : ''} >
            <Link onClick={()=>setActiveTab("portfolio")} href={"/echoverse/portfolio"}>Portfolio</Link>
        </li>
        <li className={activeTab === "socials" ? "bg-slate-800 text-white" : ''} >
            <Link onClick={()=>setActiveTab("socials")} href={"#"}>Socials</Link>
        </li>
        <li>
            <Link href={"#"}>About</Link>
        </li>
      
    </ul>
    )
    
}