import continueWithSocialAuth from "./continue-with-social-auth";

export const continueWithGoogle = () =>
    continueWithSocialAuth("google", "google-oauth2");
export const continueWithFacebook = () =>
    continueWithSocialAuth("facebook", "facebook");
