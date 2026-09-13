"use client";

import React, { useState } from "react";
import { Check, X, Sparkles, ShieldCheck, GraduationCap, Building2, Globe } from "lucide-react";
import { passComparisons, PassComparisonData } from "@/data/passes";

interface PassComparisonTableProps {
  passId?: string;
  showTabs?: boolean;
  showHeader?: boolean;
  className?: string;
}

export default function PassComparisonTable({
  passId,
  showTabs = false,
  showHeader = true,
  className = "",
}: PassComparisonTableProps) {
  const [selectedId, setSelectedId] = useState<string>(passId || "school-student");

  const currentId = passId || selectedId;
  const activeData: PassComparisonData =
    passComparisons[currentId] || passComparisons["school-student"];

  const tabs = [
    { id: "school-student", label: "Student Pass", price: "₹429 / ₹550", icon: GraduationCap },
    { id: "bits-internal", label: "BITSian Pass", price: "₹650 / ₹1,299", icon: Building2 },
    { id: "external-guest", label: "Guest Pass", price: "₹650 / ₹850", icon: Globe },
  ];

  return (
    <div className={`w-full ${className}`}>
      {/* Header Section */}
      {showHeader && (
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-red-50 border border-red-200/60 text-[#eb0028] text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Tier Comparison · Standard vs. Premium</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-2">
              {activeData.name}: Standard vs. Premium
            </h3>
            <p className="text-sm font-light text-neutral-600 max-w-2xl">
              Compare inclusions across both tiers to select the experience tailored to your conference participation.
            </p>
          </div>

          {/* Interactive Switcher Tabs when showTabs is enabled */}
          {showTabs && (
            <div className="flex flex-wrap items-center gap-2 bg-neutral-100/80 p-1.5 rounded-2xl border border-neutral-200/60 self-start md:self-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = (passId ? currentId === tab.id : selectedId === tab.id);
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedId(tab.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                      isActive
                        ? "bg-white text-[#eb0028] shadow-sm border border-neutral-200/80"
                        : "text-neutral-600 hover:text-neutral-900 hover:bg-white/50"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Responsive Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50/80">
              <th className="py-6 px-6 font-mono text-xs font-bold uppercase tracking-wider text-neutral-600 w-1/2 sm:w-7/12">
                Benefits & Privileges
              </th>

              {/* Standard Column Header */}
              <th className="py-6 px-4 text-center font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 w-1/4 sm:w-2.5/12 border-l border-neutral-200 bg-neutral-50/50">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <span>Standard</span>
                    {activeData.standardTag && (
                      <span className="text-[9px] font-mono normal-case tracking-normal px-1.5 py-0.5 rounded bg-emerald-100/70 text-emerald-800 font-bold">
                        {activeData.standardTag}
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl sm:text-2xl font-sans font-bold text-neutral-900">
                      {activeData.standardPrice}
                    </span>
                    {activeData.originalStandardPrice && (
                      <span className="text-xs text-neutral-400 line-through font-sans">
                        {activeData.originalStandardPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-normal text-neutral-500 font-sans normal-case">
                    Essential Access
                  </span>
                </div>
              </th>

              {/* Premium Column Header */}
              <th className="py-6 px-4 text-center font-mono text-xs font-bold uppercase tracking-wider text-[#eb0028] w-1/4 sm:w-2.5/12 border-l border-neutral-200 bg-red-50/40">
                <div className="flex flex-col items-center gap-1.5">
                  <span className="flex items-center gap-1">
                    <span>Premium</span>
                    <ShieldCheck className="h-4 w-4 text-[#eb0028]" />
                  </span>
                  <span className="text-xl sm:text-2xl font-sans font-bold text-[#eb0028]">
                    {activeData.premiumPrice}
                  </span>
                  <span className="text-[10px] font-normal text-[#eb0028]/80 font-sans normal-case">
                    All-Inclusive Experience
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-sm font-sans">
            {activeData.benefits.map((item, index) => (
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
