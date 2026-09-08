"use client";

import React, { createContext, useContext, useState, useId } from "react";
import { motion, AnimatePresence } from "motion/react";

interface AccordionContextType {
  openValues: Set<string>;
  toggleValue: (val: string) => void;
  collapsible?: boolean;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

interface AccordionItemContextType {
  value: string;
  isOpen: boolean;
  triggerId: string;
  contentId: string;
}

const AccordionItemContext = createContext<AccordionItemContextType | null>(null);

export interface AccordionProps {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (val: string | string[]) => void;
  className?: string;
  children: React.ReactNode;
}

export function Accordion({
  type = "single",
  collapsible = true,
  defaultValue,
  value: controlledValue,
  onValueChange,
  className = "",
  children,
}: AccordionProps) {
  const [internalValues, setInternalValues] = useState<Set<string>>(() => {
    if (defaultValue) {
      return new Set(Array.isArray(defaultValue) ? defaultValue : [defaultValue]);
    }
    return new Set<string>();
  });

  const activeValues = controlledValue !== undefined
    ? new Set(Array.isArray(controlledValue) ? controlledValue : [controlledValue])
    : internalValues;

  const toggleValue = (val: string) => {
    const next = new Set(activeValues);
    if (next.has(val)) {
      if (collapsible || next.size > 1) {
        next.delete(val);
      }
    } else {
      if (type === "single") {
        next.clear();
      }
      next.add(val);
    }

    if (controlledValue === undefined) {
      setInternalValues(next);
    }

    if (onValueChange) {
      const arr = Array.from(next);
      onValueChange(type === "single" ? (arr[0] ?? "") : arr);
    }
  };

  return (
    <AccordionContext.Provider value={{ openValues: activeValues, toggleValue, collapsible }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function AccordionItem({
  value,
  children,
  className = "",
  ...props
}: AccordionItemProps) {
  const ctx = useContext(AccordionContext);
  const id = useId();
  const triggerId = `accordion-trigger-${id}`;
  const contentId = `accordion-content-${id}`;

  const isOpen = Boolean(ctx?.openValues.has(value));
  const dataState = isOpen ? "open" : "closed";

  return (
    <AccordionItemContext.Provider value={{ value, isOpen, triggerId, contentId }}>
      <div
        data-state={dataState}
        className={className}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function AccordionTrigger({
  children,
  className = "",
  ...props
}: AccordionTriggerProps) {
  const ctx = useContext(AccordionContext);
  const itemCtx = useContext(AccordionItemContext);

  if (!itemCtx) {
    throw new Error("AccordionTrigger must be used inside an AccordionItem");
  }

  const { value, isOpen, triggerId, contentId } = itemCtx;
  const dataState = isOpen ? "open" : "closed";

  return (
    <button
      type="button"
      id={triggerId}
      aria-expanded={isOpen}
      aria-controls={contentId}
      data-state={dataState}
      onClick={() => ctx?.toggleValue(value)}
      className={`cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function AccordionContent({
  children,
  className = "",
  ...props
}: AccordionContentProps) {
  const itemCtx = useContext(AccordionItemContext);

  if (!itemCtx) {
    throw new Error("AccordionContent must be used inside an AccordionItem");
  }

  const { isOpen, triggerId, contentId } = itemCtx;
  const dataState = isOpen ? "open" : "closed";

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={contentId}
          role="region"
          aria-labelledby={triggerId}
          data-state={dataState}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className={className} {...props}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
