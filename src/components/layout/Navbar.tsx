import Link from "next/link";
import TedxLogo from "@/components/layout/TedxLogo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/speakers", label: "Speakers" },
  { href: "/team", label: "Team" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/gallery", label: "Gallery" },
  { href: "/schedule", label: "Schedule" },
  { href: "/venue", label: "Venue" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  return (
    <nav className="site-nav flex items-center justify-between px-6 py-4">
      <TedxLogo href="/" className="h-7 w-auto" priority />
      <ul className="site-nav-links flex gap-6">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
