import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export default function SocialsForm() {
  const { control } = useFormContext();

  return (
    <div>
      <h1 className="my-4 text-center text-2xl font-bold">Social Links</h1>
      <FormField
        control={control}
        name="twitter"
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <FormLabel>Twitter</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter your twitter link" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="fb_page"
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <FormLabel className="whitespace-nowrap">Facebook Page</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter your facebook page link" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="instagram"
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <FormLabel>Instagram</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter your instagram link" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="fb_profile_link"
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <FormLabel className="whitespace-nowrap">
              Facebook Profile
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter facebook profile link" />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
