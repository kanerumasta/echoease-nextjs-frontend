import Link from 'next/link'
export default function Navbar() {
    
    return <nav className="p-4 bg-slate-600 fixed top-0 left-0 w-full">

        <Link className="p-2 rounded-xl bg-blue-500" href="/auth/login">Sign In</Link>
        <Link className="p-2 rounded-xl bg-slate-500"  href="/auth/register">Sign Up</Link>
    </nav>;
}
