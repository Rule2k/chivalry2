import { MeleeAttack } from "chivalry2-weapons/dist";
import { Swing } from "chivalry2-weapons/dist/weapon";

interface ValueType<T> {
  highest: T;
  lowest: T;
}

type MeleeAttackType<T extends keyof MeleeAttack> = ValueType<MeleeAttack[T]>;
type SwingType<T extends keyof Swing> = ValueType<Swing[T]>;

interface MinMaxWeaponStats {
  damage: MeleeAttackType<"damage">;
  range: SwingType<"range"> | SwingType<"altRange">;
  staminaDamage: MeleeAttackType<"staminaDamage">;
  windup: MeleeAttackType<"windup">;
  release: MeleeAttackType<"release">;
  recovery: MeleeAttackType<"recovery">;
}

interface MinMaxWeaponStats {
  damage: MeleeAttackType<"damage">;
  range: SwingType<"range"> | SwingType<"altRange">;
  staminaDamage: MeleeAttackType<"staminaDamage">;
  windup: MeleeAttackType<"windup">;
  release: MeleeAttackType<"release">;
  recovery: MeleeAttackType<"recovery">;
}

export interface StatsValues {
  name: string;
  isLowerBetter: boolean;
  type: "dmg" | "ms" | "";
  id: keyof MinMaxWeaponStats;
  highest: number;
  lowest: number;
}
