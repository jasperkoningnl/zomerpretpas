"use client";

type DagInfo = {
  datum: string;
  dag: string;
  nummer: number;
  maand: string;
  count: number;
  isVandaag: boolean;
};

export function DagNavigatie({
  dagen,
  gekozenDatum,
}: {
  dagen: DagInfo[];
  gekozenDatum: string;
}) {
  return (
    <nav className="dag-strip" aria-label="Dag navigatie">
      {dagen.map((d) => (
        <a
          key={d.datum}
          href={`/?datum=${d.datum}`}
          className={`dag-item${d.datum === gekozenDatum ? " dag-actief" : ""}${
            d.isVandaag ? " dag-vandaag" : ""
          }`}
        >
          <span className="dag-label">{d.dag.slice(0, 2)}</span>
          <span className="dag-nr">{d.nummer}</span>
          <span className="dag-count">
            {d.count > 0 ? d.count : "–"}
          </span>
        </a>
      ))}
    </nav>
  );
}
