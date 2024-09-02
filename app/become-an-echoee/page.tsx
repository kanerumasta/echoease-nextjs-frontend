"use client"

import ArtistApplicationForm from "@/components/forms/artists-forms/artist-application-form";
import { ProfileSetup } from "@/components/forms/auth-forms";
import { useCreateArtistApplicationMutation } from "@/redux/features/artistApiSlice";
import { useIsArtistQuery, useIsCompleteProfileQuery } from "@/redux/features/authApiSlice";
import { useRouter } from "next/navigation";

export default function Page(){
  const checkIsArtist = useIsArtistQuery();
  const fetchIsProfileComplete = useIsCompleteProfileQuery();
  const router = useRouter();

  if(checkIsArtist.isLoading) return
  if(checkIsArtist.isSuccess){
    return <div><button onClick={()=>router.back()}>Back</button>
    <p>Youre already an artist</p>
    </div>
  }

  if(fetchIsProfileComplete.isLoading)return
  if(fetchIsProfileComplete.isError){
    return <ProfileSetup />
  }

  return <ArtistApplicationForm />
}