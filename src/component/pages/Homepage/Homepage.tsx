import { CharacterClass } from "chivalry2-weapons";
import Link from "next/link";

export const Homepage = () => {
  return (
    <main>
      <div>
        {Object.entries(CharacterClass).map(([key, value]) => (
          <Link href={`/class/${key.toLowerCase()}`} key={key}>
            {value}
          </Link>
        ))}
      </div>
    </main>
  );
};
