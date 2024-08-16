import { ROUTES } from "@/conf";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
    subsets: ["latin"],
    weight: "900",
  });
export default function Home() {
    return (
        <div>
            <section >
                <h1 className={cn(poppins.className, "text-center text-blue-400 font-black text-5xl my-4")}>Hire Talent. Echo with Ease.</h1>
            </section>
            <Link className="bg-blue-500 p-4 rounded-md flex w-[120px] justify-center align-center" href={ROUTES.echoHunt}>Echo Hunt</Link>
        </div>
    );
}
