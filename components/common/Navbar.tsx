"use client";

import { ROUTES } from "@/conf";
import { useFetchUserQuery } from "@/redux/features/authApiSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserMenu from "./UserMenu";
import { RiChatSmile2Fill } from "react-icons/ri";

export default function Navbar() {
  const { data: user, isLoading } = useFetchUserQuery();
  const path = usePathname();

  return (
    <nav className="p-4 w-full flex items-center justify-between">
      <h2 className="text-2xl font-bold">
        <span className="text-blue-500">Echo</span>ease
      </h2>
      <div className="flex ">
        <Link href={ROUTES.chat}><RiChatSmile2Fill size={30} color="#3569bd" /></Link>

        {!user && path === ROUTES.home && (
          <div>
            <Link
              className="p-2 rounded-xl bg-blue-500"
              href={ROUTES.auth.login}
            >
              Sign In
            </Link>
            <Link
              className="p-2 rounded-xl bg-slate-500"
              href={ROUTES.auth.register}
            >
              Sign Up
            </Link>
          </div>
        )}
        {user && <UserMenu user={user} />}
      </div>
    </nav>
  );
}
