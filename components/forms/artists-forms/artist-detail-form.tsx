"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import MultipleSelector from "@/components/ui/multiple-selector";
import { useFetchGenresQuery } from "@/redux/features/artistApiSlice";
import { GenreOptionSchema } from "@/schemas";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { IoMdCloudUpload } from "react-icons/io";
import { z } from "zod";

type GenderOption = {
  label: string;
  value: string;
  disabled?: boolean | undefined;
};

export default function DetailForm() {
  const fetchGenres = useFetchGenresQuery();
  const [genreOptions, setGenreOptions] = useState<GenderOption[]>([]);

  useEffect(() => {
    if (fetchGenres.data) {
      const options = fetchGenres.data?.map((g) => {
        return {
          label: g.name,
          value: g.id.toString(),
        };
      });
      setGenreOptions(options);
    }
  }, [fetchGenres.data]);
  const { control } = useFormContext();

  return (
    <>
      <h1 className="my-4 text-2xl font-bold text-center">Echoee Identity</h1>
      <div className="p-4 rounded-xl min-h-96 bg-slate-100">
      <FormField
        control={control}
        name="genres"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Genres</FormLabel>
            <FormControl>
              <MultipleSelector
                badgeClassName="bg-blue-400"
                {...field}
                options={genreOptions}
                placeholder="Select your genres"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
       </div>
    </>
   
  );
}
