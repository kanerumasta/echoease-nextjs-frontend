"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFetchMyArtistProfileQuery } from "@/redux/features/artistApiSlice";
import Image from "next/image";

export default function Page() {
  const { data, isLoading } = useFetchMyArtistProfileQuery();
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Get To Know Me</h1>
      {data?.profile_image && (
        <Image onLoadingComplete={(img)=>console.log(img.naturalHeight)} objectFit="cover" width={300} height={300} alt="Profile Picture" src={`https://res.cloudinary.com/duqgjwp7q/${data?.profile_image}`} />
      )}
      {/* {data?.profile_image && (
        <Avatar>
          <AvatarImage
          width={300}
            src={`https://res.cloudinary.com/duqgjwp7q/${data?.profile_image}`}
            alt="Profile Picture"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )} */}

      <div className="flex flex-col my-4 ">
        <Label className="w-[150px]">Bio</Label>
        <Textarea readOnly value={data?.bio} />
      </div>
      <div className="flex flex-col my-4">
        <Label className="w-[150px]">Street</Label>
        <Input
          readOnly
          value={`${data?.street}, ${data?.brgy}, ${data?.city}, ${data?.country}, ${data?.zipcode}`}
        />
      </div>
      <div className="flex flex-col my-4">
        <Label className="w-[150px]">Phone No.</Label>
        <Input readOnly value={data?.phone} />
      </div>
      <div className="flex flex-col my-4">
        <Label className="w-[150px]">Gender</Label>
        <Input readOnly value={data?.gender} />
      </div>
      <div className="flex flex-col my-4">
        <Label className="w-[150px]">Facebook Page</Label>
        <Input readOnly value={data?.fb_page} />
      </div>
      <div className="flex flex-col my-4">
        <Label className="w-[150px]">Facebook Profile</Label>
        <Input readOnly value={data?.fb_profile_link} />
      </div>
      <div className="flex flex-col my-4">
        <Label className="w-[150px]">Twitter</Label>
        <Input readOnly value={data?.twitter} />
      </div>
    </div>
  );
}
