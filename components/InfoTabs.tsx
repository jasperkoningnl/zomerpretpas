"use client";

const tabs = [
  { key: "spelregels", label: "Spelregels" },
  { key: "colofon", label: "Colofon" },
  { key: "sponsors", label: "Sponsors" },
  { key: "disclaimer", label: "Disclaimer" },
];

export function InfoTabs({ activeTab }: { activeTab: string }) {
  return (
    <div className="info-tabs">
      {tabs.map((t) => (
        <a
          key={t.key}
          href={`/info?tab=${t.key}`}
          className={`info-tab${activeTab === t.key ? " active" : ""}`}
        >
          {t.label}
        </a>
      ))}
    </div>
  );
}
