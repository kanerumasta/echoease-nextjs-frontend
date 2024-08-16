"use client";

import { Spinner } from "@/components/common";
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
  console.log(listArtists.data);
  return (
    <div className="">
      <div className="flex justify-evenly gap-4">
        {listArtists.data?.map((artist) => (
          <div>
            <Image
              src={`https://res.cloudinary.com/duqgjwp7q/${artist.user.profile_image}`}
              alt="Profile Image"
              width={200}
              height={200}
            />
            <p></p>
            <h1>{artist.gender}</h1>
            <p>{artist.phone}</p>
            <p>{artist.street}</p>
            <p>{artist.brgy}</p>
            <p>{artist.city}</p>
            <p>{artist.country}</p>
            <p>{artist.zipcode}</p>
            <p>{artist.dob}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
