import { notFound } from "next/navigation";
import {
  getActiviteit,
  leeftijdLabel,
  momentenVanActiviteit,
  prijsLabel,
} from "@/lib/activiteiten";
import { googleCalendarUrl, icsDataUrl } from "@/lib/calendar";
import { soortKleuren, toegankelijkheidInfo } from "@/lib/styles";

export default async function Detail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const a = getActiviteit(id);
  if (!a) notFound();

  const acc = toegankelijkheidInfo[a.toegankelijkheid];
  const google = googleCalendarUrl(a);
  const ics = icsDataUrl(a);
  const soortKleur = soortKleuren[a.soort];
  const prijs = prijsLabel(a);
  const isGratis = a.prijs_nu === 0 && !a.prijs_tekst;

  return (
    <div>
      <div className="detail-bar" style={{ background: soortKleur }} />
      <div className="detail-content">
        <a href="javascript:history.back()" className="detail-back">
          ← Terug
        </a>
        <div className="detail-soort" style={{ color: soortKleur }}>
          {a.soort}
        </div>
        <h1 className="detail-titel">{a.titel}</h1>
        {a.beschrijving && (
          <p className="detail-beschrijving">{a.beschrijving}</p>
        )}

        <div className="detail-info">
          <div className="detail-grid">
            <span className="detail-label">Locatie</span>
            <span className="detail-value">
              {a.locatie ?? "Locatie volgt"}
              {a.adres ? `, ${a.adres}` : ""}
            </span>
            <span className="detail-label">Wijk</span>
            <span className="detail-value">{a.wijk}</span>
            <span className="detail-label">Datum</span>
            <span className="detail-value">
              {a.datum
                ? a.datum
                : a.datum_van && a.datum_tot
                  ? `${a.datum_van} t/m ${a.datum_tot}`
                  : a.herhaling ?? "Zie website"}
            </span>
            {a.tijd_start && (
              <>
                <span className="detail-label">Tijd</span>
                <span className="detail-value">
                  {a.tijd_start}
                  {a.tijd_eind ? ` – ${a.tijd_eind}` : ""}
                </span>
              </>
            )}
            <span className="detail-label">Leeftijd</span>
            <span className="detail-value">{leeftijdLabel(a)} jaar</span>
            <span className="detail-label">Prijs</span>
            <span
              className="detail-value"
              style={{
                color: isGratis ? "#0a7c42" : "#1a2e3a",
                fontWeight: 700,
              }}
            >
              {prijs}
            </span>
            <span className="detail-label">Toegankelijkheid</span>
            <span className="detail-value" style={{ color: acc.kleur }}>
              {acc.label}
            </span>
            {a.organisator && (
              <>
                <span className="detail-label">Organisator</span>
                <span className="detail-value">{a.organisator}</span>
              </>
            )}
            {a.info && (
              <>
                <span className="detail-label">Info</span>
                <span className="detail-value">{a.info}</span>
              </>
            )}
            {a.opmerking && (
              <>
                <span className="detail-label">Opmerking</span>
                <span className="detail-value">{a.opmerking}</span>
              </>
            )}
          </div>
        </div>

        {a.aanmelden && (
          <div className="detail-aanmelden">
            <div className="detail-aanmelden-title">Aanmelden</div>
            <div className="detail-aanmelden-text">
              {a.aanmelden}
              {a.aanmelden_vanaf ? `, vanaf ${a.aanmelden_vanaf}` : ""}
            </div>
          </div>
        )}

        <div className="detail-actions">
          {google && ics ? (
            <>
              <a className="button" href={google}>
                Zet in agenda
              </a>
              <a
                className="detail-heart button-outline"
                download={`${a.id}.ics`}
                href={ics}
                title="Download .ics"
              >
                📅
              </a>
            </>
          ) : (
            <div style={{ fontSize: "13px", color: "#6b8a99" }}>
              Kalenderexport is beschikbaar voor activiteiten met een concrete
              datum en starttijd.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
