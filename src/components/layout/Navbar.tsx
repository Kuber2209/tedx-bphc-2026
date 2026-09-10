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
  { href: "/venue", label: "Venue" },
  { href: "/passes", label: "Passes" },
  { href: "/team", label: "Team" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/faq", label: "FAQ" },
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

  const isDarkHero = pathname === '/' && !scrolled;

  const navClasses = `fixed top-0 w-full z-[150] transition-all duration-500 ease-[0.16,1,0.3,1] px-6 md:px-12 flex items-center justify-between ${
    scrolled
      ? "py-4 bg-white/90 backdrop-blur-xl border-b border-black/10"
      : "py-8 bg-transparent border-b border-transparent"
  }`;

  return (
    <>
      <nav className={navClasses}>
        <TedxLogo href="/" className="h-6 md:h-7 w-auto relative z-20" priority light={isDarkHero} />
        
        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <li key={link.href} className="relative group py-2">
                <Link 
                  href={link.href}
                  className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${
                    isActive 
                      ? (isDarkHero ? "text-white" : "text-black") 
                      : `text-zinc-500 ${isDarkHero ? "hover:text-white" : "hover:text-black"}`
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
                  <div className={`absolute bottom-0 left-0 w-0 h-[2px] ${isDarkHero ? "bg-white/30" : "bg-black/20"} group-hover:w-full transition-all duration-300`}></div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Toggle */}
        <button 
          className={`md:hidden relative z-20 p-2 -mr-2 ${isDarkHero ? "text-white" : "text-black"}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="w-6 h-4 flex flex-col justify-between">
            <span className={`block w-full h-[1.5px] ${isDarkHero ? "bg-white" : "bg-black"} transition-transform duration-300 ${mobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`}></span>
            <span className={`block w-full h-[1.5px] ${isDarkHero ? "bg-white" : "bg-black"} transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-full h-[1.5px] ${isDarkHero ? "bg-white" : "bg-black"} transition-transform duration-300 ${mobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}></span>
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
            className="fixed inset-0 z-[140] bg-white flex flex-col justify-center px-6"
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
                        isActive ? "text-black" : "text-zinc-400"
                      }`}
                    >
                      {isActive && <span className="w-2 h-2 rounded-full bg-[#eb0028]"></span>}
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
