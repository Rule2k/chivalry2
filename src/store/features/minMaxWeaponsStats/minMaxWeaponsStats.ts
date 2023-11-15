import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { getAverageMinMaxWeaponsStats } from "@/utils/getAverageMinMaxWeaponsStats/getAverageMinMaxWeaponsStats";
import { CharacterClass } from "chivalry2-weapons/dist";
import { StatsValues } from "@/interfaces/statsValues";

const initialState: StatsValues[] = [];

export const minMaxWeaponsStats = createSlice({
  name: "minMaxWeaponsStats",
  initialState,
  reducers: {
    updateMinMaxWeaponsStats: (
      _,
      action: PayloadAction<{ targetClass?: CharacterClass }>,
    ) => getAverageMinMaxWeaponsStats(action.payload.targetClass),
  },
});

export const { updateMinMaxWeaponsStats } = minMaxWeaponsStats.actions;

export const selectGetAverageMinMaxWeaponsStats = (state: RootState) =>
  state.minMaxWeaponsStats;

export default minMaxWeaponsStats.reducer;
