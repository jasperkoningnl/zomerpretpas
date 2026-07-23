import Link from "next/link";
import { ActivityCard } from "@/components/ActivityCard";
import { activiteitenOpDatum, filterActiviteiten, vandaagAmsterdam } from "@/lib/activiteiten";

function telDagOp(datumISO: string, dagen: number) {
  const datum = new Date(`${datumISO}T00:00:00Z`);
  datum.setUTCDate(datum.getUTCDate() + dagen);
  return datum.toISOString().slice(0, 10);
}

function tabHref(dag: "vandaag" | "morgen", sp: Record<string, string>) {
  const params = new URLSearchParams();
  params.set("dag", dag);
  if (sp.leeftijd) params.set("leeftijd", sp.leeftijd);
  if (sp.wijk) params.set("wijk", sp.wijk);
  if (sp.alles) params.set("alles", sp.alles);
  return `/?${params.toString()}`;
}

export default async function Home({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const sp = await searchParams;
  const dag = sp.dag === "morgen" ? "morgen" : "vandaag";
  const vandaag = vandaagAmsterdam();
  const datum = dag === "morgen" ? telDagOp(vandaag, 1) : vandaag;
  const alles = sp.alles === "1";
  const filters = { leeftijd: sp.leeftijd ? Number(sp.leeftijd) : undefined, wijken: sp.wijk ? [sp.wijk] : undefined };
  const lijst = alles ? activiteitenOpDatum(datum) : filterActiviteiten(activiteitenOpDatum(datum), filters);
  const activiteitenVandaag = lijst.filter((activiteit) => activiteit.datum === datum);
  const doorlopend = lijst.filter((activiteit) => activiteit.datum !== datum);

  return <>
    <h2>Activiteiten {dag}, {datum}</h2>
    <div className="tabs">
      <Link className={dag === "vandaag" ? "tab active" : "tab"} href={tabHref("vandaag", sp)}>Vandaag</Link>
      <Link className={dag === "morgen" ? "tab active" : "tab"} href={tabHref("morgen", sp)}>Morgen</Link>
    </div>
    {!alles && (sp.leeftijd || sp.wijk) ? <p className="card">Je standaardfilters zijn actief. <a href="/?alles=1">Toon toch alles</a>.</p> : null}
    {lijst.length ? <div className="grid">
      <section>
        <h3>Specifiek op deze dag</h3>
        {activiteitenVandaag.length ? <div className="grid">{activiteitenVandaag.map((activiteit) => <ActivityCard key={activiteit.id} activiteit={activiteit} />)}</div> : <p className="card">Geen activiteiten met een losse datum voor deze dag.</p>}
      </section>
      <details className="card">
        <summary>Doorlopende activiteiten en aanbiedingen ({doorlopend.length})</summary>
        <p>Deze activiteiten gelden ook op deze dag, maar staan als reeks of doorlopend aanbod in het boekje.</p>
        <div className="grid">{doorlopend.map((activiteit) => <ActivityCard key={activiteit.id} activiteit={activiteit} />)}</div>
      </details>
    </div> : <p className="card">Geen activiteiten gevonden voor deze datum. Buiten de vakantie loopt het programma van 18 juli tot en met 30 augustus 2026.</p>}
  </>;
}
