"use client";

import { useCreateArtistApplicationMutation } from "@/redux/features/artistApiSlice";
import { ArtistApplicationSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


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

      if (data.sample_video1)
        formData.append("sample_video1", data.sample_video1);

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
