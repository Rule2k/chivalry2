"use client";

import { AverageMinMaxWeaponsStatsProvider } from "@/context/averageMinMaxWeaponsStats/AverageMinMaxWeaponsStats";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AverageMinMaxWeaponsStatsProvider>
      {children}
    </AverageMinMaxWeaponsStatsProvider>
  );
}
