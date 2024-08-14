import { toast } from "sonner";

export default async function continueWithSocialAuth(
  redirect: string,
  provider: string
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_HOST}/api/o/${provider}/?redirect_uri=http://localhost:3000/auth/${redirect}`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    if (response.status === 200 && typeof window !== undefined) {
      window.location.replace(data.authorization_url);
    } else {
      toast.error("Something went wrong");
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
}
