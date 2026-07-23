"use client";

import { useRouter, useSearchParams } from "next/navigation";

const AGE_CHIPS = [
  { label: "Alle", value: "" },
  { label: "0–3", value: "2" },
  { label: "4–6", value: "5" },
  { label: "6–9", value: "7" },
  { label: "9–12", value: "10" },
  { label: "12+", value: "14" },
];

export function LeeftijdFilter({ value }: { value?: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setLeeftijd(leeftijd: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (leeftijd) {
      params.set("leeftijd", leeftijd);
    } else {
      params.delete("leeftijd");
    }
    router.push(`/?${params.toString()}`);
  }

  const activeValue = value !== undefined ? String(value) : "";

  return (
    <div className="leeftijd-filter">
      <div className="leeftijd-chips">
        {AGE_CHIPS.map((chip) => (
          <button
            key={chip.label}
            className={`leeftijd-chip${activeValue === chip.value ? " active" : ""}`}
            onClick={() => setLeeftijd(chip.value)}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}
