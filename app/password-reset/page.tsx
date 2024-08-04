import { PasswordResetForm } from "@/components/forms/auth-forms";

export default function Page() {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div>Reset Password</div>
      <PasswordResetForm />
    </div>
  );
}
