import { ActivityCard } from "@/components/ActivityCard";
import { LeeftijdFilter } from "@/components/LeeftijdFilter";
import {
  activiteitenOpDatum,
  filterActiviteiten,
  isDoorlopend,
  vandaagAmsterdam,
  VAKANTIE_START,
  VAKANTIE_EIND,
} from "@/lib/activiteiten";
import { DagNavigatie } from "@/components/DagNavigatie";

const DAGNAMEN = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
const MAANDEN = [
  "januari", "februari", "maart", "april", "mei", "juni",
  "juli", "augustus", "september", "oktober", "november", "december",
];

function formatDatum(iso: string) {
  const d = new Date(`${iso}T12:00:00+02:00`);
  const dag = DAGNAMEN[d.getUTCDay()];
  const nummer = d.getUTCDate();
  const maand = MAANDEN[d.getUTCMonth()];
  return { dag, nummer, maand, volledig: `${dag} ${nummer} ${maand}` };
}

function telDagen(van: string, tot: string): number {
  const d1 = new Date(van);
  const d2 = new Date(tot);
  return Math.round((d2.getTime() - d1.getTime()) / 86400000);
}

function verschuifDatum(iso: string, dagen: number): string {
  const d = new Date(`${iso}T12:00:00+02:00`);
  d.setUTCDate(d.getUTCDate() + dagen);
  return d.toISOString().slice(0, 10);
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sp = await searchParams;
  const vandaag = vandaagAmsterdam();
  const gekozenDatum = sp.datum || vandaag;
  const isVandaag = gekozenDatum === vandaag;
  const leeftijd = sp.leeftijd ? Number(sp.leeftijd) : undefined;

  const alleOpDatum = activiteitenOpDatum(gekozenDatum);
  const gefilterd = leeftijd !== undefined
    ? filterActiviteiten(alleOpDatum, { leeftijd })
    : alleOpDatum;

  const dagActiviteiten = gefilterd.filter((a) => !isDoorlopend(a));
  const doorlopend = gefilterd.filter((a) => isDoorlopend(a));

  const { dag, nummer, maand } = formatDatum(gekozenDatum);

  const inVakantie =
    gekozenDatum >= VAKANTIE_START && gekozenDatum <= VAKANTIE_EIND;

  const komendeDagen = Array.from({ length: 7 }, (_, i) => {
    const d = verschuifDatum(vandaag, i);
    const info = formatDatum(d);
    const count = activiteitenOpDatum(d).filter((a) => !isDoorlopend(a)).length;
    return { datum: d, ...info, count, isVandaag: d === vandaag };
  });

  return (
    <>
      <div className="datum-header">
        <div className="datum-hero">
          <span className="datum-nummer">{nummer}</span>
          <div className="datum-detail">
            <span className="datum-dag">{dag}</span>
            <span className="datum-maand">{maand}</span>
          </div>
        </div>
        {isVandaag ? (
          <span className="vandaag-badge">VANDAAG</span>
        ) : (
          <a className="vandaag-link" href="/">
            Terug naar vandaag
          </a>
        )}
      </div>

      <DagNavigatie dagen={komendeDagen} gekozenDatum={gekozenDatum} />

      <LeeftijdFilter value={leeftijd} />

      <div className="resultaat-header">
        <span className="resultaat-count">
          {dagActiviteiten.length} activiteit{dagActiviteiten.length !== 1 ? "en" : ""} op deze dag
        </span>
      </div>

      <div className="grid">
        {dagActiviteiten.length ? (
          dagActiviteiten.map((a) => <ActivityCard key={a.id} activiteit={a} />)
        ) : (
          <div className="card">
            <div className="card-body lege-dag">
              {inVakantie ? (
                <p>Geen activiteiten gevonden voor deze dag.</p>
              ) : (
                <>
                  <p>
                    Het ZomerPretPas programma loopt van{" "}
                    <strong>18 juli</strong> tot en met{" "}
                    <strong>30 augustus 2026</strong>.
                  </p>
                  {gekozenDatum < VAKANTIE_START && (
                    <p>
                      Nog {telDagen(gekozenDatum, VAKANTIE_START)} dagen tot de
                      start!{" "}
                      <a className="button" href={`/?datum=${VAKANTIE_START}`}>
                        Bekijk eerste dag
                      </a>
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {doorlopend.length > 0 && (
        <>
          <div className="doorlopend-header">
            <h2 className="doorlopend-titel">Doorlopende activiteiten</h2>
            <span className="resultaat-count">{doorlopend.length}</span>
          </div>
          <div className="doorlopend-grid">
            {doorlopend.map((a) => (
              <ActivityCard key={a.id} activiteit={a} compact />
            ))}
          </div>
        </>
      )}
    </>
  );
}
