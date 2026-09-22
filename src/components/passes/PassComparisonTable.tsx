"use client";

import React, { useState } from "react";
import { Check, X, GraduationCap, Building2, Globe } from "lucide-react";
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
    { id: "school-student", label: "Student Pass", icon: GraduationCap },
    { id: "bits-internal", label: "BITSian Pass", icon: Building2 },
    { id: "external-guest", label: "Guest Pass", icon: Globe },
  ];

  return (
    <div className={`w-full ${className}`}>
      {/* Header Section */}
      {showHeader && (
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-2">
              {activeData.name}
            </h3>
            <p className="text-sm font-light text-neutral-600 max-w-2xl">
              Compare inclusions across conference tiers to select the experience tailored to your participation.
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
              <th className="py-5 px-6 font-mono text-xs font-bold uppercase tracking-wider text-neutral-700 w-1/2 sm:w-7/12">
                Benefits & Privileges
              </th>
              <th className="py-5 px-4 text-center font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 w-1/4 sm:w-2.5/12 border-l border-neutral-200 bg-neutral-50/50">
                <span className="block font-bold">Standard</span>
                <span className="block text-[10px] font-normal text-neutral-500 font-sans normal-case mt-0.5">
                  Essential Access
                </span>
              </th>
              <th className="py-5 px-4 text-center font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 w-1/4 sm:w-2.5/12 border-l border-neutral-200 bg-neutral-50/50">
                <span className="block font-bold">Full Access</span>
                <span className="block text-[10px] font-normal text-neutral-500 font-sans normal-case mt-0.5">
                  Complete Experience
                </span>
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

                {/* Full Access Tier */}
                <td className="py-4 px-4 text-center border-l border-neutral-100">
                  {item.fullAccess ? (
                    <div
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/80"
                      title="Included in Full Access"
                    >
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                    </div>
                  ) : (
                    <div
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-neutral-100 text-neutral-400"
                      title="Not included in Full Access"
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
