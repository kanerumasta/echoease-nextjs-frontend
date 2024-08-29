"use client";

import { Spinner } from "@/components/common";
import { Button } from "@/components/ui/button";
import { useFetchListArtistsQuery } from "@/redux/features/artistApiSlice";
import Image from "next/image";

//Clients feed
export default function Page() {
  const listArtists = useFetchListArtistsQuery();
  if (listArtists.isLoading) {
    return (
      <div>
        <Spinner lg />
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="">
      <div className="flex min-h-screen justify-evenly gap-4">
        {listArtists.data?.map((artist) => (
          <div className="p-4">
            <Image
              src={`https://res.cloudinary.com/duqgjwp7q/${artist.user.profile_image}`}
              alt="Profile Image"
              width={200}
              height={200}
            />
            {/* name */}
            <div className="flex gap-1">
              <span className="text-xl font-bold text-black capitalize">
                {artist.user.first_name}
              </span>
              <span className="text-xl font-bold text-black capitalize">
                {artist.user.last_name}
              </span>
            </div>
            <p></p>
            <span>#Jazz</span>

            <Button variant={"destructive"}>Hire Me</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
