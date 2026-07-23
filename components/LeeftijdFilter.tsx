"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function LeeftijdFilter({ value }: { value?: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setLeeftijd = useCallback(
    (leeftijd: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (leeftijd) {
        params.set("leeftijd", leeftijd);
        params.delete("alles");
      } else {
        params.delete("leeftijd");
      }
      router.push(`/?${params.toString()}`);
    },
    [router, searchParams],
  );

  return (
    <div className="leeftijd-filter">
      <label htmlFor="leeftijd-input">Leeftijd</label>
      <div className="leeftijd-row">
        <input
          id="leeftijd-input"
          type="number"
          inputMode="numeric"
          min={0}
          max={18}
          placeholder="bv. 8"
          defaultValue={value ?? ""}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setLeeftijd((e.target as HTMLInputElement).value);
            }
          }}
          onBlur={(e) => {
            const v = e.target.value;
            if (v !== String(value ?? "")) {
              setLeeftijd(v);
            }
          }}
        />
        {value !== undefined && (
          <button
            className="button leeftijd-wis"
            onClick={() => setLeeftijd("")}
            aria-label="Filter wissen"
          >
            Wis
          </button>
        )}
      </div>
    </div>
  );
}
