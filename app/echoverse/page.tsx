import Link from "next/link";

//--Artists dashboard
export default function Page() {
  return (
    <div className="min-h-screen p-4 grid grid-cols-4 gap-2">
      <div className="w-[300px] h-[300px] rounded-lg bg-blue-400">
        <Link href={"/echoverse/about"}>
        Echoship Basta Portfolio ni
        
        </Link>
      </div>
      <div className="w-[300px] h-[300px] rounded-lg bg-blue-400">
        Bookings
      </div>
      <div className="w-[300px] h-[300px] rounded-lg bg-blue-400">
        
      </div>
      <div className="w-[300px] h-[300px] rounded-lg bg-blue-400"></div>
      <div className="w-[300px] h-[300px] rounded-lg bg-blue-400"></div>
      <div className="w-[300px] h-[300px] rounded-lg bg-blue-400"></div>
      <div className="w-[300px] h-[300px] rounded-lg bg-blue-400"></div>
      <div className="w-[300px] h-[300px] rounded-lg bg-blue-400"></div>
      <div className="w-[300px] h-[300px] rounded-lg bg-blue-400"></div>
    </div>
  );
}
