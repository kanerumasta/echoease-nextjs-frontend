"use client";
import { notFound, useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ artist: string }>();
  console.log(params);
  if (params.artist !== "johan") {
    return notFound();
  }
  return <div>Artist</div>;
}
