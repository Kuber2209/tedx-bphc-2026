"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TedxLogo from "@/components/layout/TedxLogo";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/speakers", label: "Speakers" },
  { href: "/schedule", label: "Schedule" },
  { href: "/gallery", label: "Gallery" },
  { href: "/venue", label: "Venue" },
  { href: "/team", label: "Team" },
  { href: "/sponsors", label: "Sponsors" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navClasses = `sticky top-0 w-full z-[150] transition-all duration-500 ease-[0.16,1,0.3,1] px-6 md:px-12 flex items-center justify-between ${
    scrolled
      ? "py-4 bg-white/95 backdrop-blur-xl border-b border-black/10"
      : "py-6 bg-white border-b border-transparent"
  }`;

  return (
    <>
      <nav className={navClasses}>
        <TedxLogo href="/" className="text-xl md:text-2xl relative z-20" priority light={false} />
        
        {/* Desktop Navigation & Actions: Aligned to the right */}
        <div className="hidden md:flex items-center gap-7 lg:gap-9">
          <ul className="flex items-center gap-5 lg:gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <li key={link.href} className="relative group py-2">
                  <Link 
                    href={link.href}
                    className={`text-[13px] lg:text-sm font-semibold tracking-[0.08em] uppercase transition-colors duration-300 outline-none focus:outline-none focus-visible:outline-none ring-0 select-none ${
                      isActive 
                        ? "text-black font-bold" 
                        : "text-zinc-600 hover:text-black"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {isActive && (
                    <motion.div 
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-[#eb0028]"
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                  {!isActive && (
                    <div className={`absolute bottom-0 left-0 w-0 h-[1.5px] bg-black/30 group-hover:w-full transition-all duration-300`}></div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Right CTA Button */}
          <Link
            href="/passes"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-[4px] bg-[#eb0028] hover:bg-[#c40022] text-white font-semibold text-xs md:text-sm tracking-wider uppercase transition-colors duration-200 shadow-xs cursor-pointer"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`md:hidden relative z-20 p-2 -mr-2 text-black`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="w-6 h-4 flex flex-col justify-between">
            <span className={`block w-full h-[1.5px] bg-black transition-transform duration-300 ${mobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`}></span>
            <span className={`block w-full h-[1.5px] bg-black transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-full h-[1.5px] bg-black transition-transform duration-300 ${mobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}></span>
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[140] bg-white flex flex-col justify-center px-6 text-black"
          >
            <ul className="flex flex-col gap-8">
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <motion.li 
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <Link 
                      href={link.href}
                      className={`text-4xl font-bold tracking-tighter flex items-center gap-4 ${
                        isActive ? "text-black" : "text-zinc-500 hover:text-zinc-800"
                      }`}
                    >
                      {isActive && <span className="w-2 h-2 rounded-full bg-[#eb0028]"></span>}
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.08, duration: 0.4 }}
              className="mt-8 pt-4 border-t border-black/10"
            >
              <Link
                href="/passes"
                className="inline-flex items-center justify-center w-full py-3.5 rounded-[4px] bg-[#eb0028] hover:bg-[#c40022] text-white font-semibold text-sm tracking-wider uppercase transition-colors shadow-xs"
              >
                Register
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
