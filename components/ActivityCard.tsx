import Link from "next/link";
import type { Activiteit } from "@/lib/activiteiten";
import { leeftijdLabel, prijsLabel } from "@/lib/activiteiten";
import { soortKleuren, toegankelijkheidInfo } from "@/lib/styles";

export function ActivityCard({
  activiteit,
  count,
}: {
  activiteit: Activiteit;
  count?: number;
}) {
  const acc = toegankelijkheidInfo[activiteit.toegankelijkheid];
  const prijs = prijsLabel(activiteit);
  const isGratis = activiteit.prijs_nu === 0 && !activiteit.prijs_tekst;
  const soortKleur = soortKleuren[activiteit.soort];

  return (
    <article className="card">
      <div className="bar" style={{ background: soortKleur }} />
      <div className="card-soort" style={{ color: soortKleur }}>
        {activiteit.soort}
      </div>
      <h2 className="card-titel">
        <Link href={`/activiteiten/${activiteit.id}`}>{activiteit.titel}</Link>
      </h2>
      {activiteit.beschrijving && (
        <p className="card-beschrijving">{activiteit.beschrijving}</p>
      )}
      <div className="meta">
        {activiteit.tijd_start && (
          <span className="badge badge-tijd">
            {activiteit.tijd_start}
            {activiteit.tijd_eind ? ` – ${activiteit.tijd_eind}` : ""}
          </span>
        )}
        {activiteit.datum && !activiteit.tijd_start && (
          <span className="badge">{activiteit.datum}</span>
        )}
        {activiteit.herhaling && !activiteit.datum && (
          <span className="badge">{activiteit.herhaling}</span>
        )}
        <span className="badge badge-locatie">
          {activiteit.locatie ?? "Locatie volgt"}
        </span>
        <span className="badge">{leeftijdLabel(activiteit)}</span>
        <span className={`badge ${isGratis ? "badge-gratis" : ""}`}>
          {prijs}
        </span>
        {count && count > 1 ? (
          <span className="badge badge-momenten">{count} momenten</span>
        ) : null}
        <span className="badge badge-acc" style={{ color: acc.kleur }}>
          {acc.label}
        </span>
      </div>
    </article>
  );
}
