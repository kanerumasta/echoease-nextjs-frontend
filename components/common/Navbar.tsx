"use client";

import { ROUTES } from "@/conf";
import { useFetchUserQuery } from "@/redux/features/authApiSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserMenu from "./user-menu";
import { RiChatSmile2Fill } from "react-icons/ri";
import Image from "next/image";
import { useState } from "react";


export default function Navbar() {
  const { data: user, isLoading } = useFetchUserQuery();

  const path = usePathname();

  return (
    <nav className=" h-[70px] flex items-center mx-[180px] justify-between">
      <h2 className="text-2xl font-bold">
        <Image
          alt="logo"
          width={200}
          height={100}
          src={"/media/echo-logo.png"}
        />
      </h2>
      <div className="flex items-center gap-4">
        {!path.includes("/become-an-echoee") && (
          <Link href={"/become-an-echoee/get-started"}>Become an Echoee</Link>
        )}
        <Link href={ROUTES.chat}>
          <RiChatSmile2Fill size={30} color="#3569bd" />
        </Link>

        {!user && path === ROUTES.home && (
          <div className="flex items-center gap-4">
            <Link
              className="p-2 rounded-xl bg-blue-500"
              href={ROUTES.auth.login}
            >
              Sign In
            </Link>
            <Link className="" href={ROUTES.auth.register}>
              Sign Up
            </Link>
          </div>
        )}
        {user && <UserMenu user={user} />}
      </div>
     
    </nav>
  );
}
