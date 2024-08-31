import { z } from "zod";

export const ResetPasswordConfirmSchema = z.object({
  uid: z.string(),
  token: z.string(),
  new_password: z.string(),
  re_new_password: z.string(),
});

export type TResetPasswordConfirmSchema = z.infer<
  typeof ResetPasswordConfirmSchema
>;

export const UserSchema = z.object({
  first_name: z.string(),
  last_name: z.string().nullable(),
  email: z.string().email(),
  id: z.number(),
  profile_image: z.string().nullable(),
});

const GenderSchema = z.union([z.literal("male"), z.literal("female")]);

export const ProfileSchema = z.object({
  dob: z.date({ required_error: "This field is required" }),
  gender: GenderSchema,
  phone: z.string({ required_error: "This field is required" }),
  country: z.string().optional(),
  province: z.string({ required_error: "This field is required" }),
  municipality: z.string({ required_error: "This field is required" }),
  brgy: z.string({ required_error: "This field is required" }),
  street: z.string({ required_error: "This field is required" }),
  zipcode: z.string({ required_error: "This field is required" }),
});

export const ChatSchema = z.object({
  code: z.string(),
  participants: z.array(UserSchema),
});

export const MessageSchema = z.object({
  id: z.string(),
  author: z.string().email(),
  content: z.string(),
  date: z.string(),
  time: z.string(),
});

//Artist Schemas

export const GenreOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const GenreSchema = z.object({
  id: z.number().min(1),
  name: z.string(),
});

export const ArtistApplicationSchema = z.object({
  sample_videos: z
    .array(z.instanceof(File))
    .min(3, "At least 3 videos are required.")
    .max(3, "You can only upload up to 3 videos."),
  fb_page: z.string(),
  instagram: z.string(),
  twitter: z.string(),
  fb_profile_link: z.string(),
  genres: z.array(GenreOptionSchema),
});

export const ArtistSchema = z.object({
  user: UserSchema,
  fb_page: z.string(),
  fb_profile_link: z.string(),
  id: z.number(),
  slug: z.string(),
  street: z.string(),
  twitter: z.string(),
});
