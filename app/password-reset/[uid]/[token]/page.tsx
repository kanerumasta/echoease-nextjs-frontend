import { ConfirmPasswordResetForm } from "@/components/forms/auth-forms";

export default function Page() {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <h2>Confirm Password Reset</h2>
      <ConfirmPasswordResetForm />
    </div>
  );
}
