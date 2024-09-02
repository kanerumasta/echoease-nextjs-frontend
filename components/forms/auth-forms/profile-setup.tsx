"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useProfileSetupMutation } from "@/redux/features/authApiSlice";
import { ProfileSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import GenderPicker from "@/components/common/gender-picker";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import AddProfilePic from "./add-profile-picture";

const provinceSchema = z.object({
  code: z.string(),
  name: z.string(),
});

const cityMunicipalitySchema = z.object({
  code: z.string(),
  name: z.string(),
});

const barangaySchema = z.object({
  code: z.string(),
  name: z.string(),
});

export default function ProfileSetup() {
  const [profileSetup, { isLoading }] = useProfileSetupMutation();
  const [doneProfileDetails, setDoneProfileDetails] = useState(false);
  const [provinces, setProvinces] = useState<
    z.infer<typeof provinceSchema>[] | []
  >([]);
  const [municipalities, setMunicipalities] = useState<
    z.infer<typeof cityMunicipalitySchema>[] | []
  >();
  const [barangays, setBarangays] =
    useState<z.infer<typeof barangaySchema>[]>();

  const [selectedProvinceCode, setSelectedProvinceCode] = useState<
    string | null
  >(null);
  const [selectedMunicipalityCode, setSelectedMunicipalityCode] = useState<
    string | null
  >(null);

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
  });

  const onSubmit = form.handleSubmit((data: z.infer<typeof ProfileSchema>) => {
    console.log(data);
    profileSetup(data)
      .unwrap()
      .then(() => {
        setDoneProfileDetails(true);
      })
      .catch(() => console.log("err"));
  });

  const fetchProvinces = async () => {
    const provinces = await fetch("https://psgc.gitlab.io/api/provinces");
    provinces
      .json()
      .then((res) => {
        const validatedResult = z.array(provinceSchema).safeParse(res);
        if (validatedResult.success) {
          const sortedProvinces = validatedResult.data.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setProvinces(sortedProvinces);
        }
      })
      .catch((err) => setProvinces([]));
  };

  const fetchMunicipalities = async (provinceCode: string) => {
    const municipalities = await fetch(
      `https://psgc.gitlab.io/api/provinces/${provinceCode}/cities-municipalities`
    );
    municipalities
      .json()
      .then((res) => {
        console.log(res);
        const validatedResult = z.array(cityMunicipalitySchema).safeParse(res);
        console.log(validatedResult.data);
        if (validatedResult.success) {
          const sortedMunicipalities = validatedResult.data.sort((a, b) =>
            a.name.localeCompare(b.name)
          );

          setMunicipalities(sortedMunicipalities);
          console.log(sortedMunicipalities);
        } else {
          console.log("not success");
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchBarangays = async (municipalityCode: string) => {
    const barangays = await fetch(
      `https://psgc.gitlab.io/api/cities-municipalities/${municipalityCode}/barangays`
    );
    barangays
      .json()
      .then((res) => {
        const validatedResult = z.array(barangaySchema).safeParse(res);

        if (validatedResult.success) {
          const sortedBarangays = validatedResult.data.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setBarangays(sortedBarangays);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvinceCode) {
      fetchMunicipalities(selectedProvinceCode);
    }
  }, [selectedProvinceCode]);

  const handleProvinceChange = (provinceName: string) => {
    const province = provinces.find((p) => p.name === provinceName);
    if (province) {
      setSelectedProvinceCode(province.code);
    }
  };

  const handleMunicipalityChange = (municipalityName: string) => {
    const municipality = municipalities?.find(
      (m) => m.name === municipalityName
    );
    if (municipality) {
      setSelectedMunicipalityCode(municipality.code);
    }
  };

  useEffect(() => {
    if (selectedMunicipalityCode) {
      fetchBarangays(selectedMunicipalityCode);
    }
  }, [selectedMunicipalityCode]);

  if (doneProfileDetails) {
    return <AddProfilePic />;
  }

  return (
    <div>
      <h1 className="text-center text-2xl text-black font-bold">
        Complete your personal details
      </h1>
      <Form {...form}>
        <form
          className="w-[700px] p-10 rounded-lg mx-auto mb-12 space-y-4"
          onSubmit={onSubmit}
        >
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex w-full whitespace-nowrap items-center gap-2">
                  <FormLabel className="font-bold">Date of Birth</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormLabel className="font-bold">Phone</FormLabel>
                  <FormControl>
                    <Input className="w-[150px]" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full gap-2">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="w-full flex items-center gap-2">
                  <FormLabel className="font-bold">Country</FormLabel>
                  <FormControl>
                    <Input readOnly defaultValue={"Philippines"} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem className="w-full flex items-center gap-2">
                  <FormLabel className="font-bold">Province</FormLabel>

                  <Select
                    {...field}
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleProvinceChange(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a province" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {provinces?.map((province) => (
                        <SelectItem value={province.name}>
                          {province.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="municipality"
              render={({ field }) => (
                <FormItem className="w-full flex items-center gap-2">
                  <FormLabel className="font-bold">Municipality</FormLabel>
                  <Select
                    {...field}
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleMunicipalityChange(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a municipality" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {municipalities?.map((municipality) => (
                        <SelectItem value={municipality.name}>
                          {municipality.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brgy"
              render={({ field }) => (
                <FormItem className="w-full flex items-center gap-2">
                  <FormLabel className="font-bold">Barangay</FormLabel>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a barangay" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {barangays?.map((barangay) => (
                        <SelectItem value={barangay.name}>
                          {barangay.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem className="w-full flex items-center gap-2">
                  <FormLabel className="font-bold">Street</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipcode"
              render={({ field }) => (
                <FormItem className="flex w-full items-center gap-2">
                  <FormLabel className="font-bold whitespace-nowrap flex-shrink-0">
                    Zip Code
                  </FormLabel>
                  <FormControl className="flex-1">
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="gender"
            defaultValue="male"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Gender</FormLabel>
                <FormControl>
                  <GenderPicker value={field.value} onChange={field.onChange} />
                </FormControl>

                {form.formState.errors.gender && (
                  <FormDescription className="text-red-400">
                    {form.formState.errors.gender.message}
                  </FormDescription>
                )}
              </FormItem>
            )}
          />
          <Button className="my-8 w-full" disabled={isLoading} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
