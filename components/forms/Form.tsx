import { Spinner } from "../common";
import FormField from "./FormField";

interface FormProps {
    onSubmit: any;
    register: any;
    btnText: string;
    isLoading: boolean;
}

export default function Form({
    onSubmit,
    register,
    btnText,
    isLoading,
}: FormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <FormField register={register} label="Email" name="email" />
            <FormField
                register={register}
                label="Password"
                name="password"
                link={{
                    href: "/password-reset",
                    label: "Forgot Password?",
                }}
            />

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {isLoading ? <Spinner sm /> : btnText}
                </button>
            </div>
        </form>
    );
}
