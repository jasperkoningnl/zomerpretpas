import { ActivityCard } from "@/components/ActivityCard";
import { FilterForm } from "@/components/FilterForm";
import {
  activiteiten,
  filterActiviteiten,
  momentenVanActiviteit,
} from "@/lib/activiteiten";

export default async function ActiviteitenPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sp = await searchParams;
  const gefilterd = filterActiviteiten(activiteiten, {
    wijken: sp.wijk ? [sp.wijk] : undefined,
    soorten: sp.soort ? [sp.soort] : undefined,
    leeftijd: sp.leeftijd ? Number(sp.leeftijd) : undefined,
    toegankelijkheden: sp.toegankelijkheid ? [sp.toegankelijkheid] : undefined,
    gratis: sp.gratis === "1",
    datum: sp.datum || undefined,
  });

  const groups = new Map<string, typeof gefilterd>();
  for (const a of gefilterd) {
    const key = `${a.titel}|${a.locatie ?? ""}`;
    groups.set(key, [...(groups.get(key) ?? []), a]);
  }

  const hasFilters = sp.wijk || sp.soort || sp.leeftijd || sp.toegankelijkheid || sp.gratis || sp.datum;

  return (
    <>
      <h1 className="page-title">Alle activiteiten</h1>
      <FilterForm />
      <div className="resultaat-header">
        <span className="resultaat-count">
          {groups.size} activiteit{groups.size !== 1 ? "en" : ""}
          {hasFilters ? " (gefilterd)" : ""}
        </span>
        {hasFilters && (
          <>
            {" "}
            <a href="/activiteiten" style={{ fontSize: "13px", color: "#E6007E", fontWeight: 600 }}>
              Wis filters
            </a>
          </>
        )}
      </div>
      <div className="grid">
        {[...groups.values()].map((groep) => (
          <ActivityCard
            key={groep[0].id}
            activiteit={groep[0]}
            count={groep.reduce(
              (n, a) => n + Math.max(1, momentenVanActiviteit(a).length),
              0
            )}
          />
        ))}
      </div>
    </>
  );
}
