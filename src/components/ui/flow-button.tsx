'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  href?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'red' | 'white' | 'black' | 'outline';
  hasArrow?: boolean;
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  leftIcon?: LucideIcon | React.ComponentType<{ className?: string }>;
  circleColor?: string;
  external?: boolean;
  children?: React.ReactNode;
}

export function FlowButton({
  text = 'Modern Button',
  href,
  variant = 'default',
  hasArrow = true,
  icon: Icon = ArrowRight,
  leftIcon: LeftIcon,
  circleColor,
  external,
  className,
  children,
  onClick,
  ...props
}: FlowButtonProps) {
  // Variant base button styles
  const variantStyles: Record<string, string> = {
    default:
      'border-[1.5px] border-[#333333]/40 bg-transparent text-[#111111] hover:border-transparent hover:text-white',
    primary:
      'border-[1.5px] border-transparent bg-[#eb0028] text-white hover:border-transparent hover:text-white shadow-sm',
    red:
      'border-[1.5px] border-transparent bg-[#eb0028] text-white hover:border-transparent hover:text-white shadow-sm',
    secondary:
      'border-[1.5px] border-black/20 bg-white text-black hover:border-transparent hover:text-white shadow-xs',
    white:
      'border-[1.5px] border-black/20 bg-white text-black hover:border-transparent hover:text-white shadow-xs',
    black:
      'border-[1.5px] border-transparent bg-black text-white hover:border-transparent hover:text-white shadow-sm',
    outline:
      'border-[1.5px] border-black/20 bg-transparent text-black hover:border-transparent hover:text-white',
  };

  // Default circle background colors per variant
  const defaultCircleColors: Record<string, string> = {
    default: 'bg-[#111111]',
    primary: 'bg-[#111111]',
    red: 'bg-[#111111]',
    secondary: 'bg-[#111111]',
    white: 'bg-[#111111]',
    black: 'bg-[#eb0028]', // Signature TED red expansion on black
    outline: 'bg-[#111111]',
  };

  const resolvedCircleColor = circleColor || defaultCircleColors[variant] || 'bg-[#111111]';

  // Arrow stroke colors
  const arrowColorStyles: Record<string, string> = {
    default: 'stroke-[#111111] group-hover:stroke-white',
    primary: 'stroke-white group-hover:stroke-white',
    red: 'stroke-white group-hover:stroke-white',
    secondary: 'stroke-black group-hover:stroke-white',
    white: 'stroke-black group-hover:stroke-white',
    black: 'stroke-white group-hover:stroke-white',
    outline: 'stroke-black group-hover:stroke-white',
  };

  const currentArrowColor = arrowColorStyles[variant] || arrowColorStyles.default;

  const buttonClasses = cn(
    'group relative inline-flex items-center justify-center gap-1 overflow-hidden rounded-[100px] px-8 py-3 text-sm font-semibold cursor-pointer select-none',
    'transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)]',
    'hover:rounded-[14px] active:scale-[0.96]',
    variantStyles[variant] || variantStyles.default,
    className
  );

  const innerContent = (
    <>
      {/* Left flying arrow (arr-2) */}
      {hasArrow && (
        <Icon
          className={cn(
            'absolute w-4 h-4 left-[-25%] fill-none z-[9]',
            'group-hover:left-4 transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]',
            currentArrowColor
          )}
        />
      )}

      {/* Button label & optional static left icon */}
      <span
        className={cn(
          'relative z-[1] inline-flex items-center gap-2 transition-all duration-[800ms] ease-out',
          hasArrow ? '-translate-x-3 group-hover:translate-x-3' : 'group-hover:scale-[1.02]'
        )}
      >
        {LeftIcon && <LeftIcon className="w-4 h-4 transition-colors duration-300 shrink-0" />}
        <span>{children || text}</span>
      </span>

      {/* Expanding circular ripple background */}
      <span
        className={cn(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-[50%] opacity-0 pointer-events-none',
          'group-hover:w-[380px] group-hover:h-[380px] group-hover:opacity-100',
          'transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]',
          resolvedCircleColor
        )}
      />

      {/* Right flying arrow (arr-1) */}
      {hasArrow && (
        <Icon
          className={cn(
            'absolute w-4 h-4 right-4 fill-none z-[9]',
            'group-hover:right-[-25%] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]',
            currentArrowColor
          )}
        />
      )}
    </>
  );

  // External / Mailto Links
  if (href && (href.startsWith('mailto:') || href.startsWith('http') || external)) {
    return (
      <a
        href={href}
        className={buttonClasses}
        target={external || href.startsWith('http') ? '_blank' : undefined}
        rel={external || href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {innerContent}
      </a>
    );
  }

  // Internal Next.js Links
  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {innerContent}
      </Link>
    );
  }

  // Standard Interactive Button
  return (
    <button type="button" onClick={onClick} className={buttonClasses} {...props}>
      {innerContent}
    </button>
  );
}

export default FlowButton;
