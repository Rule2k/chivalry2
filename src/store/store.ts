import { configureStore } from "@reduxjs/toolkit";
import minMaxWeaponsStats from "@/store/features/minMaxWeaponsStats/minMaxWeaponsStats";

export const store = configureStore({
  reducer: {
    minMaxWeaponsStats,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
