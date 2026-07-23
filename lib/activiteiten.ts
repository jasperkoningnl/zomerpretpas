import batch1 from "@/json/batch1.json";
import batch2 from "@/json/batch2.json";
import batch3 from "@/json/batch3.json";
import batch4 from "@/json/batch4.json";

export const SOORTEN = ["ontdekken", "verhalen", "muziek", "natuur", "sport", "smullen", "creatief"] as const;
export const TOEGANKELIJKHEDEN = ["onbekend", "toegankelijk", "gedeeltelijk", "niet"] as const;
export const WIJKEN = ["Amersfoort Zuid", "Hoogland/Kattenbroek", "Kruiskamp/Koppel/Binnenstad", "Liendert/Rustenburg", "Nieuwland", "Randenbroek/Schuilenburg", "Schothorst/Zielhorst/Hoefkwartier", "Soesterkwartier/Isselt/Eemplein", "Stedelijk", "Vathorst/Hooglanderveen"] as const;
export const VAKANTIE_START = "2026-07-18";
export const VAKANTIE_EIND = "2026-08-30";
export const HERHALING_WEEKDAGEN: Record<string, number[] | null> = {
  doorlopend: null,
  dagelijks: null,
  "wekelijks op maandag": [1],
  "wekelijks op woensdag": [3],
  "wekelijks op wo en zo": [3, 7],
  "wekelijks op do, vr en za": [4, 5, 6],
  "wekelijks op wo, do, vr en za": [3, 4, 5, 6],
  "wekelijks op ma, di, do en vr": [1, 2, 4, 5],
  "wekelijks op ma t/m za": [1, 2, 3, 4, 5, 6],
  "wekelijks op wo t/m za": [3, 4, 5, 6],
  "wekelijks op di t/m zo": [2, 3, 4, 5, 6, 7],
};

type RawActiviteit = { titel: string; beschrijving: string | null; locatie: string | null; adres: string | null; wijk: string; wijk_afgeleid: boolean; leeftijd_min: number; leeftijd_max: number | null; leeftijd_label: string | null; soort: string; organisator: string | null; info: string | null; aanmelden: string | null; aanmelden_vanaf: string | null; prijs_nu: number | null; prijs_van: number | null; prijs_tekst: string | null; toegankelijkheid: string; opmerking: string | null; pagina: number; datum: string | null; tijd_start: string | null; tijd_eind: string | null; datum_van: string | null; datum_tot: string | null; herhaling: string | null };
export type Activiteit = RawActiviteit & { id: string };
export type ActiviteitenFilters = { wijken?: string[]; soorten?: string[]; leeftijd?: number; toegankelijkheden?: string[]; gratis?: boolean; datum?: string; van?: string; tot?: string };

function slugify(value: string) { return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80); }
function hash(value: string) { let h = 2166136261; for (let i = 0; i < value.length; i++) { h ^= value.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36).slice(0, 6); }
function makeId(a: RawActiviteit) { const key = [a.titel, a.pagina, a.datum ?? a.herhaling ?? "zonder-datum", a.tijd_start ?? "geen-tijd", a.locatie ?? "geen-locatie"].join("|"); return `${slugify(key)}-${hash(key)}`; }

const raw = [...(batch1.activiteiten as RawActiviteit[]), ...(batch2.activiteiten as RawActiviteit[]), ...(batch3.activiteiten as RawActiviteit[]), ...(batch4.activiteiten as RawActiviteit[])];
export const activiteiten: Activiteit[] = raw.map((activiteit) => ({ ...activiteit, id: makeId(activiteit) }));
export const activiteitMap = new Map(activiteiten.map((activiteit) => [activiteit.id, activiteit]));
export function getActiviteit(id: string) { return activiteitMap.get(id); }
export function leeftijdPast(activiteit: Activiteit, leeftijd: number) { return activiteit.leeftijd_min <= leeftijd && leeftijd <= (activiteit.leeftijd_max ?? 99); }
export function isGratis(activiteit: Activiteit) { return activiteit.prijs_nu === 0; }
function weekdagAmsterdam(datumISO: string) { const d = new Date(`${datumISO}T12:00:00+02:00`); const day = d.getUTCDay(); return day === 0 ? 7 : day; }
export function activiteitOpDatum(activiteit: Activiteit, datumISO: string) {
  if (activiteit.datum) return activiteit.datum === datumISO;
  if (!activiteit.herhaling) return false;
  if (!activiteit.datum_van || !activiteit.datum_tot) return false;
  if (datumISO < activiteit.datum_van || datumISO > activiteit.datum_tot) return false;
  const dagen = HERHALING_WEEKDAGEN[activiteit.herhaling];
  if (dagen === undefined) { console.warn(`Onbekende herhaling: ${activiteit.herhaling}`); return false; }
  return dagen === null || dagen.includes(weekdagAmsterdam(datumISO));
}
export function isDoorlopend(activiteit: Activiteit) { return activiteit.herhaling === "doorlopend"; }
export function activiteitenOpDatum(datumISO: string) { return activiteiten.filter((activiteit) => activiteitOpDatum(activiteit, datumISO)); }
export function vandaagAmsterdam() { return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Amsterdam", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()); }
export function momentenVanActiviteit(activiteit: Activiteit) {
  if (activiteit.datum) return [activiteit];
  const out: Activiteit[] = []; if (!activiteit.datum_van || !activiteit.datum_tot) return out;
  for (let d = new Date(`${activiteit.datum_van}T00:00:00Z`); d <= new Date(`${activiteit.datum_tot}T00:00:00Z`); d.setUTCDate(d.getUTCDate() + 1)) { const iso = d.toISOString().slice(0, 10); if (activiteitOpDatum(activiteit, iso)) out.push({ ...activiteit, datum: iso }); }
  return out;
}
export function filterActiviteiten(lijst: Activiteit[], filters: ActiviteitenFilters) {
  return lijst.filter((a) => (!filters.wijken?.length || filters.wijken.includes(a.wijk)) && (!filters.soorten?.length || filters.soorten.includes(a.soort)) && (filters.leeftijd === undefined || leeftijdPast(a, filters.leeftijd)) && (!filters.toegankelijkheden?.length || filters.toegankelijkheden.includes(a.toegankelijkheid)) && (!filters.gratis || isGratis(a)) && (!filters.datum || activiteitOpDatum(a, filters.datum)) && (!filters.van || momentenVanActiviteit(a).some((m) => (m.datum ?? "") >= filters.van!)) && (!filters.tot || momentenVanActiviteit(a).some((m) => (m.datum ?? "") <= filters.tot!)));
}
export function prijsLabel(a: Activiteit) { if (a.prijs_tekst) return a.prijs_tekst; return a.prijs_nu === 0 ? "Gratis" : `€${(a.prijs_nu ?? 0).toFixed(2).replace(".", ",")}`; }
export function leeftijdLabel(a: Activiteit) { return a.leeftijd_label ?? `${a.leeftijd_min}${a.leeftijd_max === null ? "+" : `-${a.leeftijd_max}`}`; }
