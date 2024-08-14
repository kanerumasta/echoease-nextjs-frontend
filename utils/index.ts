import continueWithSocialAuth from "./continue-with-social-auth";
import { ChatSchema } from "@/schemas";
import { z } from "zod";

export const continueWithGoogle = () =>
    continueWithSocialAuth("google", "google-oauth2");
export const continueWithFacebook = () =>
    continueWithSocialAuth("facebook", "facebook");



export function getChatPartner(
    chat: z.infer<typeof ChatSchema>,
    currentUser: string | undefined
  ) {
    if (currentUser) {
      const filteredParticipants = chat.participants.filter(
        (participant) => participant.email !== currentUser
      );
      return `${filteredParticipants[0].first_name} ${filteredParticipants[0].last_name}`;
    }
    return "NOne";
  }