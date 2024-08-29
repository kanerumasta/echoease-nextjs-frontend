"use client";
import { useFetchDetailArtistBySlugQuery } from "@/redux/features/artistApiSlice";
import { notFound, useParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const params = useParams<{ slug: string }>();
  const artist = useFetchDetailArtistBySlugQuery(params.slug);

  if (artist.isLoading) return <div>Loading...</div>;

  if (artist.isError) return notFound();

  return <div>{artist.data?.bio}</div>;
}
