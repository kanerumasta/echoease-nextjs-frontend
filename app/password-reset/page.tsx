import { PasswordResetForm } from "@/components/forms/auth-forms";

export default function Page() {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 className="font-bold text-2xl mb- ">Forgot Password</h1>
      <p className="text-sm text-gray-500 mb-4 ">
        Enter the email address you used to create the account, and we will
        email you instructions to reset your password.
      </p>
      <PasswordResetForm />
    </div>
  );
}
