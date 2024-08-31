"use client";
import { Spinner } from "@/components/common";
import DetailForm from "@/components/forms/artists-forms/artist-detail-form";
import SocialsForm from "@/components/forms/artists-forms/socials-form";
import UploadMediaForm from "@/components/forms/artists-forms/upload-media-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ApplicationFormProvider } from "@/lib/providers";
import { useCreateArtistApplicationMutation } from "@/redux/features/artistApiSlice";
import { ArtistApplicationSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const steps = [
  {
    id: 1,
    name: "Step 1",
    fields: ["genres"],
  },
  {
    id: 2,
    name: "Step 2",
    fields: ["sample_videos"],
  },
  {
    id: 3,
    name: "Step 3",
    fields: ["fb_page", "instagram", "twitter", "fb_profile_link"],
  },
];

const VideoContext = createContext({});

const Page = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [createArtistAplication, { isLoading, isSuccess }] =
    useCreateArtistApplicationMutation();

  const methods = useForm<z.infer<typeof ArtistApplicationSchema>>({
    resolver: zodResolver(ArtistApplicationSchema),
    shouldUnregister: false,
  });

  const onSubmit = (data: z.infer<typeof ArtistApplicationSchema>) => {
    const formData = new FormData();

    if (data.sample_videos) {
      Array.from(data.sample_videos).forEach((vid, index) => {
        formData.append(`sample_video${index + 1}`, vid || "");
      });
    }

    formData.append("fb_page", data.fb_page);
    formData.append("instagram", data.instagram);
    formData.append("twitter", data.twitter);
    formData.append("fb_profile_link", data.fb_profile_link);
    data.genres.forEach((genre) => {
      formData.append("genres", genre.value);
    });

    createArtistAplication(formData)
      .unwrap()
      .then((res) => toast.success("suloihs"))
      .catch((err) => console.log(err));
  };

  type FieldName = keyof z.infer<typeof ArtistApplicationSchema>;

  const handleNext = async () => {
    const fields = steps[currentStep - 1].fields;

    const isValid = await methods.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!isValid) {
      toast.error("Complete required fields");
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="mb-12">
      <ApplicationFormProvider>
        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-[500px] mx-auto space-y-6"
          >
            {currentStep === 1 && <DetailForm />}
            {currentStep === 2 && <UploadMediaForm />}
            {currentStep === 3 && <SocialsForm />}

            <div className="flex justify-between">
              {currentStep > 1 && (
                <button type="button" onClick={handleBack}>
                  Back
                </button>
              )}
              {currentStep < steps.length ? (
                <button type="button" onClick={handleNext}>
                  Next
                </button>
              ) : (
                <Button type="submit">
                  {isLoading ? <Spinner lg /> : "Submit"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </ApplicationFormProvider>
    </div>
  );
};

export default Page;
