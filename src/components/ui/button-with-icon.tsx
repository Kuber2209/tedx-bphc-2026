'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonWithIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  href?: string;
  variant?: 'red' | 'primary' | 'black' | 'white' | 'default';
  icon?: LucideIcon | React.ComponentType<{ className?: string; size?: number }>;
  rotateOnHover?: boolean;
  external?: boolean;
  children?: React.ReactNode;
}

export function ButtonWithIcon({
  text = "Let's Collaborate",
  href,
  variant = 'red',
  icon: Icon = ArrowUpRight,
  rotateOnHover = true,
  external = false,
  className,
  children,
  onClick,
  ...props
}: ButtonWithIconProps) {
  // Theme-tailored color variants preserving site aesthetics
  const variantStyles = {
    red: 'bg-[#eb0028] text-white hover:bg-neutral-950 shadow-sm hover:shadow-[0_12px_32px_-6px_rgba(235,0,40,0.35)]',
    primary: 'bg-[#eb0028] text-white hover:bg-neutral-950 shadow-sm hover:shadow-[0_12px_32px_-6px_rgba(235,0,40,0.35)]',
    black: 'bg-black text-white hover:bg-[#eb0028] shadow-sm hover:shadow-[0_12px_32px_-6px_rgba(0,0,0,0.3)]',
    white: 'bg-white text-neutral-900 border border-black/15 hover:border-black hover:bg-neutral-50 shadow-xs',
    default: 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm',
  };

  // Sliding circular bubble colors
  const bubbleStyles = {
    red: 'bg-white text-[#eb0028] shadow-xs group-hover:text-black',
    primary: 'bg-white text-[#eb0028] shadow-xs group-hover:text-black',
    black: 'bg-white text-black shadow-xs group-hover:text-[#eb0028]',
    white: 'bg-neutral-900 text-white shadow-xs group-hover:bg-[#eb0028]',
    default: 'bg-white text-neutral-900 shadow-xs',
  };

  const containerClasses = cn(
    'group relative inline-flex items-center justify-center rounded-full h-14 p-1 ps-8 pe-16 w-fit overflow-hidden cursor-pointer select-none font-bold text-xs uppercase tracking-[0.2em]',
    'transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]',
    'hover:ps-16 hover:pe-8 active:scale-[0.97]',
    variantStyles[variant] || variantStyles.red,
    className
  );

  const innerContent = (
    <>
      {/* Dynamic shifting text label */}
      <span className="relative z-10 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] whitespace-nowrap">
        {children || text}
      </span>

      {/* Floating circular icon bubble sliding from right to left */}
      <div
        className={cn(
          'absolute right-1.5 w-11 h-11 rounded-full flex items-center justify-center',
          'transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]',
          'group-hover:right-[calc(100%-50px)]',
          rotateOnHover && 'group-hover:rotate-45',
          bubbleStyles[variant] || bubbleStyles.red
        )}
      >
        <Icon size={17} className="transition-transform duration-500" />
      </div>
    </>
  );

  // External / Mailto link
  if (href && (href.startsWith('http') || href.startsWith('mailto:') || external)) {
    return (
      <a
        href={href}
        className={containerClasses}
        target={external || href.startsWith('http') ? '_blank' : undefined}
        rel={external || href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {innerContent}
      </a>
    );
  }

  // Internal Next.js link
  if (href) {
    return (
      <Link href={href} className={containerClasses}>
        {innerContent}
      </Link>
    );
  }

  // Standard Button
  return (
    <button type="button" onClick={onClick} className={containerClasses} {...props}>
      {innerContent}
    </button>
  );
}

export default ButtonWithIcon;
