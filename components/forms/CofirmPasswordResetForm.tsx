"use client";

import { Spinner } from "@/components/common";
import { useConfirmPasswordReset } from "@/hooks/auth";

export default function ConfirmPasswordReset() {
    const { register, onSubmit, isLoading } = useConfirmPasswordReset();

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    New Password
                </label>
                <div className="mt-2">
                    <input
                        id="email"
                        {...register("new_password")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Confirm New Password
                </label>
                <div className="mt-2">
                    <input
                        id="password"
                        {...register("re_new_password")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <button disabled={isLoading} type="submit">
                {isLoading ? <Spinner sm /> : "Submit"}
            </button>
        </form>
    );
}
