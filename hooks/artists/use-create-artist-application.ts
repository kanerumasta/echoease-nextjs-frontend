"use client";

import { useCreateArtistApplicationMutation } from "@/redux/features/artistApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const ArtistApplicationSchema = z.object({
  dob: z.string(),
  phone: z.string(),
  street: z.string(),
  brgy: z.string(),
  city: z.string(),
  country: z.string(),
  zipcode: z.string(),
  gender: z.string(),
  sample_video1: z.instanceof(File),
  profile_image: z.instanceof(File).optional(),
  sample_video2: z.instanceof(File).optional(),
  sample_video3: z.instanceof(File).optional(),
});

export default function useCreateArtistApplication() {


  const [createArtistApplication, { isLoading, isSuccess }] =
    useCreateArtistApplicationMutation();


   

  const form = useForm<z.infer<typeof ArtistApplicationSchema>>({
    resolver: zodResolver(ArtistApplicationSchema),
  });

  const onSubmit = form.handleSubmit(
    (data: z.infer<typeof ArtistApplicationSchema>) => {
      const formData = new FormData();
      if (data.dob) {
        formData.append("dob", data.dob.toString());
        formData.append("phone", data.phone);
        formData.append("street", data.street);
        formData.append("brgy", data.brgy);
        formData.append("city", data.city);
        formData.append("country", data.country);
        formData.append("zipcode", data.zipcode);
        formData.append("gender", data.gender);
      }
      if (data.profile_image)
        formData.append("profile_image", data.profile_image);
      if (data.sample_video1)
        formData.append("sample_video1", data.sample_video1);
    //   if (data.sample_video2)
    //     formData.append("sample_video2", data.sample_video2);
    //   if (data.sample_video3)
    //     formData.append("sample_video3", data.sample_video3);

      createArtistApplication(formData)
        .unwrap()
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

    }
  );
  return {
    form,
    onSubmit,
    isLoading,
    isSuccess
  };
}
