import { CharacterClass } from "chivalry2-weapons";
import Link from "next/link";

export const Homepage = () => (
  <main>
    <div>
      {Object.entries(CharacterClass).map(([key, value]) => {
        if (value !== CharacterClass.AVERAGE) {
          return (
            <Link href={`/class/${key.toLowerCase()}`} key={key}>
              {value}
            </Link>
          );
        }
      })}
    </div>
  </main>
);
