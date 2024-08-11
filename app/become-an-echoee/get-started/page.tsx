"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen   items-center">
      <h1 className="font-bold text-3xl text-black text-center mt-8">
        Turn your artistic passion into income. Join Echoee and get discovered!
      </h1>

      <Link
        className="p-4 rounded-lg m-auto bg-blue-500"
        href={"/become-an-echoee/setup-an-echoee-profile"}
      >
        Get Started
      </Link>
      <Button variant={"outline"}> How it works</Button>
    </div>
  );
}
