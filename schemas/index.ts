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

export const ProfileSchema = z.object({
  dob: z.string(),
  gender: z.string(),
  phone: z.string(),
  street: z.string(),
  brgy: z.string(),
  city: z.string(),
  country: z.string(),
  zipcode: z.string(),
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
export const ArtistApplicationSchema = z.object({
  dob: z.string(),
  phone: z.string(),
  street: z.string(),
  brgy: z.string(),
  city: z.string(),
  country: z.string(),
  zipcode: z.string(),
  gender: z.string(),
  sample_video1: z.instanceof(File).optional(),
  sample_video2: z.instanceof(File).optional(),
  sample_video3: z.instanceof(File).optional(),
});

export const ArtistSchema = z.object({
  user: UserSchema,
  dob: z.string().date(),
  gender: z.string(),
  bio: z.string(),
  brgy: z.string(),
  city: z.string(),
  country: z.string(),
  cover_photo: z.string().nullable(),
  fb_page: z.string(),
  fb_profile_link: z.string(),
  id: z.number(),
  phone: z.string(),
  slug: z.string(),
  street: z.string(),
  twitter: z.string(),
  zipcode: z.string(),
});
