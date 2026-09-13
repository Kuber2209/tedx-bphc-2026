"use client";

import React from "react";
import PassComparisonTable from "./PassComparisonTable";

interface StudentPassComparisonTableProps {
  className?: string;
  showHeader?: boolean;
}

export default function StudentPassComparisonTable({
  className = "",
  showHeader = true,
}: StudentPassComparisonTableProps) {
  return (
    <PassComparisonTable
      passId="school-student"
      showHeader={showHeader}
      className={className}
    />
  );
}
