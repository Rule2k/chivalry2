import { createContext } from "react";
import { getAverageMinMaxWeaponsStats } from "@/utils/getAverageMinMaxWeaponsStats/getAverageMinMaxWeaponsStats";

interface Props {
  children: React.ReactNode;
}

const initialValue = getAverageMinMaxWeaponsStats();
export const AverageMinMaxWeaponsStatsContext = createContext({
  averageMinMaxWeaponsStats: initialValue,
});

export const AverageMinMaxWeaponsStatsProvider = ({ children }: Props) => {
  return (
    <AverageMinMaxWeaponsStatsContext.Provider
      value={{ averageMinMaxWeaponsStats: initialValue }}
    >
      {children}
    </AverageMinMaxWeaponsStatsContext.Provider>
  );
};
