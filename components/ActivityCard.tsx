import Link from "next/link";
import type { Activiteit } from "@/lib/activiteiten";
import { leeftijdLabel, prijsLabel } from "@/lib/activiteiten";
import { soortKleuren, toegankelijkheidInfo } from "@/lib/styles";

export function ActivityCard({
  activiteit,
  count,
  compact,
}: {
  activiteit: Activiteit;
  count?: number;
  compact?: boolean;
}) {
  const acc = toegankelijkheidInfo[activiteit.toegankelijkheid];
  const prijs = prijsLabel(activiteit);
  const isGratis = activiteit.prijs_nu === 0 && !activiteit.prijs_tekst;
  const soortKleur = soortKleuren[activiteit.soort];

  if (compact) {
    return (
      <Link
        href={`/activiteiten/${activiteit.id}`}
        className="doorlopend-item"
        style={{ borderLeft: `4px solid ${soortKleur}` }}
      >
        <div className="doorlopend-item-content">
          <div className="doorlopend-item-title">{activiteit.titel}</div>
          <div className="doorlopend-item-meta">
            {activiteit.locatie ?? "Locatie volgt"} · {leeftijdLabel(activiteit)} jaar
          </div>
        </div>
        <div className="doorlopend-chevron">›</div>
      </Link>
    );
  }

  return (
    <article className="card">
      <div className="bar" style={{ background: soortKleur }} />
      <div className="card-body">
        <div className="card-soort" style={{ color: soortKleur }}>
          {activiteit.soort}
          {isGratis && <span className="badge badge-gratis">GRATIS</span>}
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
          <span className="badge badge-locatie">
            {activiteit.locatie ?? "Locatie volgt"}
          </span>
          <span className="badge badge-leeftijd">{leeftijdLabel(activiteit)} jaar</span>
          {count && count > 1 ? (
            <span className="badge badge-momenten">{count} momenten</span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
