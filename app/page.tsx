import { ROUTES } from "@/conf";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <div className="mb-10">Be an Echoee</div>
            <Link className="bg-blue-500 p-4 rounded-md flex w-[120px] justify-center align-center" href={ROUTES.echoHunt}>Echo Hunt</Link>
        </div>
    );
}
