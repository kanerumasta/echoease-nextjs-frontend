import { UseFormRegister } from "react-hook-form";
import Link  from "next/link";

interface FormFieldProps {
    label: string;
    register: UseFormRegister<any>;
    name: string;
    link?: {
        label: string;
        href: string;
    };
}

export default function FormField({
    label,
    register,
    name,
    link,
}: FormFieldProps) {
    return (
        <div>
            <div className=" flex items-center justify-between">
                <label
                    htmlFor={name}
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {label}
                </label>
                <div>
                    {link && (
                        <Link
                            href={link?.href}
                            className="font-medium text-blue-900"
                        >
                            {link?.label}
                        </Link>
                    )}
                </div>
            </div>{" "}
            <div className="mt-2">
                <input
                    id={name}
                    {...register(name)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
        </div>
    );
}
