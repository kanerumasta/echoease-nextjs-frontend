"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen flex flex-col items-center  mx-auto">
      <h1 className="font-bold text-3xl text-black text-center mt-8">
        Turn your artistic passion into income. Join Echoee and get discovered!
      </h1>
      <div>
        <Link
          className="p-4 rounded-lg m-auto bg-blue-500"
          href={"/become-an-echoee"}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
