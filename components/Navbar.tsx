"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar(){
  const path = usePathname();
  const brand = process.env.NEXT_PUBLIC_BRAND_NAME || "DapurGenie";
  const links = [
    {href:"/", label:"Home"},
    {href:"/features", label:"Features"},
    {href:"/admin", label:"FAQ Analysis"}
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-black/5" style={{ backgroundColor: '#faf5eaff' }}>
      <div className="container py-4 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="logo" className="w-7 h-7"/>
          <span className="font-semibold text-lg">{brand}</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 text-sm">
          {links.map(l=> (
            <Link key={l.href} href={l.href} className={
              "px-3 py-2 rounded-xl " + (path===l.href ? "bg-white shadow-soft border border-black/5" : "hover:opacity-80")
            }>{l.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}