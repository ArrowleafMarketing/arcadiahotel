"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowRightIcon } from "@/components/social-icons";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Rooms", href: "/rooms" },
  { label: "Private Events", href: "/private-events" },
  { label: "Promotions", href: "/date" },
  { label: "Blog", href: "/blog" },
];

export function SiteHeader() {
  const currentPath = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between gap-6 px-1 py-1">
        <a href="/" className="relative block h-[50px] w-[160px] shrink-0 lg:h-[64px] lg:w-[200px]">
          <Image src="/assets/logo_1.png" alt="Arcadia Hotel" fill className="object-contain object-left" />
        </a>

        <nav className="hidden items-center gap-12 text-[15px] font-normal text-[#6b6a66] lg:flex">
          {navItems.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`transition-colors hover:text-[#585753] ${isActive ? "text-[#585753]" : ""}`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://booking.stayarcadia.com/"
            className="btn btn-dark gap-2 px-4 lg:gap-3 lg:px-6"
          >
            <span className="whitespace-nowrap">BOOK NOW</span>
            <span className="btn-arrow p-1 lg:p-[0.25rem]">
              <ArrowRightIcon className="h-3 w-3 lg:h-4 lg:w-4" />
            </span>
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
          >
            <span className={`block h-[2px] w-[22px] bg-black transition-all duration-200 ${open ? "translate-y-[8px] rotate-45" : ""}`} />
            <span className={`block h-[2px] w-[22px] bg-black transition-all duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-[2px] w-[22px] bg-black transition-all duration-200 ${open ? "-translate-y-[8px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      {open && (
        <nav className="flex flex-col rounded-[18px] border border-black/6 bg-white px-6 py-5 shadow-[0_4px_24px_rgba(0,0,0,0.08)] lg:hidden">
          {navItems.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`border-b border-black/6 py-4 text-[1.05rem] font-normal last:border-0 transition-colors hover:text-[#585753] ${isActive ? "text-[#585753]" : "text-[#6b6a66]"}`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      )}
    </>
  );
}
