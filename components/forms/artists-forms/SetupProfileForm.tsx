"use client";

import { useUpdateProfileMutation } from "@/redux/features/accountApiSlice";
import { TProfileSchema } from "@/schemas/user-schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SetupProfileForm() {
  const { register, handleSubmit } = useForm<TProfileSchema>();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const onSubmit = handleSubmit((data: TProfileSchema) => {
    console.log(data);
    updateProfile(data)
      .unwrap()
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  });
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="dob">Date of Birth</label>
        <input type="date" {...register("dob")} />
      </div>
      <div>
        <label htmlFor="gender">Gender</label>
        <input {...register("gender")} />
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input {...register("phone")} />
      </div>
      <div>
        <label htmlFor="street">Street</label>
        <input {...register("street")} />
      </div>
      <div>
        <label htmlFor="brgy">Barangay</label>
        <input {...register("brgy")} />
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input {...register("city")} />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input {...register("country")} />
      </div>
      <div>
        <label htmlFor="zipcode">Zipcode</label>
        <input {...register("zipcode")} />
      </div>
      <button type="submit">Next</button>
    </form>
  );
}
