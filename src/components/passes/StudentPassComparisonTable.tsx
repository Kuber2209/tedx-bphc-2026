"use client";

import React from "react";
import { Check, X, Sparkles, ShieldCheck } from "lucide-react";
import { studentPassComparison } from "@/data/passes";

interface StudentPassComparisonTableProps {
  className?: string;
  showHeader?: boolean;
}

export default function StudentPassComparisonTable({
  className = "",
  showHeader = true,
}: StudentPassComparisonTableProps) {
  return (
    <div className={`w-full ${className}`}>
      {showHeader && (
        <div className="mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-red-50 border border-red-200/60 text-[#eb0028] text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Tier Comparison</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-2">
            Student Pass: Standard vs. Premium
          </h3>
          <p className="text-sm font-light text-neutral-600 max-w-2xl">
            Compare inclusions across our two student tiers to choose the experience that best suits your goals.
          </p>
        </div>
      )}

      {/* Responsive Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50/80">
              <th className="py-5 px-6 font-mono text-xs font-bold uppercase tracking-wider text-neutral-600 w-1/2 sm:w-7/12">
                Benefits & Privileges
              </th>
              <th className="py-5 px-4 text-center font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 w-1/4 sm:w-2.5/12 border-l border-neutral-200">
                <div className="flex flex-col items-center gap-1">
                  <span>Standard</span>
                  <span className="text-[10px] font-normal text-neutral-500 font-sans normal-case">
                    Essential Access
                  </span>
                </div>
              </th>
              <th className="py-5 px-4 text-center font-mono text-xs font-bold uppercase tracking-wider text-[#eb0028] w-1/4 sm:w-2.5/12 border-l border-neutral-200 bg-red-50/30">
                <div className="flex flex-col items-center gap-1">
                  <span className="flex items-center gap-1">
                    <span>Premium</span>
                    <ShieldCheck className="h-3.5 w-3.5 text-[#eb0028]" />
                  </span>
                  <span className="text-[10px] font-normal text-[#eb0028]/80 font-sans normal-case">
                    All-Inclusive Experience
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-sm font-sans">
            {studentPassComparison.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-neutral-50/60 transition-colors"
              >
                {/* Benefit Name */}
                <td className="py-4 px-6 text-neutral-800 font-normal leading-relaxed">
                  {item.benefit}
                </td>

                {/* Standard Tier */}
                <td className="py-4 px-4 text-center border-l border-neutral-100">
                  {item.standard ? (
                    <div
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/80"
                      title="Included in Standard"
                    >
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                    </div>
                  ) : (
                    <div
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-neutral-100 text-neutral-400"
                      title="Not included in Standard"
                    >
                      <X className="h-3.5 w-3.5 stroke-[2]" />
                    </div>
                  )}
                </td>

                {/* Premium Tier */}
                <td className="py-4 px-4 text-center border-l border-neutral-100 bg-red-50/10">
                  {item.premium ? (
                    <div
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#eb0028]/10 text-[#eb0028] border border-[#eb0028]/30 font-bold"
                      title="Included in Premium"
                    >
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-neutral-100 text-neutral-400"
                      title="Not included in Premium"
                    >
                      <X className="h-3.5 w-3.5 stroke-[2]" />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
