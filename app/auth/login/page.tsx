import { LoginForm } from "@/components/forms/auth-forms";
import { ROUTES } from "@/conf";


const Page = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm />

        <p className="mt-4 text-center text-sm text-gray-500">
          <>
            <span>Don't have an account?</span>
            <a
              href={ROUTES.auth.register}
              className="font-semibold ml-2 leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up here
            </a>
          </>
        </p>
      </div>
    </div>
  );
};

export default Page;
