import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

export default function SocialsForm() {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <h1 className="my-4 text-center text-2xl font-bold">Social Links</h1>
      <FormField
        control={control}
        name="twitter"
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <FormLabel><Image alt="" width={30} height={30} src="/media/twitter.png"/></FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter your twitter link" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="fb_link"
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <FormLabel className="whitespace-nowrap"><Image alt="" width={30} height={30} src="/media/facebook.png"/></FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter your facebook link" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="instagram"
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <FormLabel><Image alt="" width={30} height={30} src="/media/instagram.png"/></FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter your instagram link" />
            </FormControl>
          </FormItem>
        )}
      />
     
    </div>
  );
}
