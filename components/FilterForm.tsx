"use client";
import { SOORTEN, WIJKEN } from "@/lib/activiteiten";

export function FilterForm() {
  return (
    <form className="filters" action="/activiteiten">
      <div className="filters-grid">
        <div>
          <label>Wijk</label>
          <select name="wijk">
            <option value="">Alle wijken</option>
            {WIJKEN.map((w) => (
              <option key={w}>{w}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Soort</label>
          <select name="soort">
            <option value="">Alle soorten</option>
            {SOORTEN.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Leeftijd</label>
          <input name="leeftijd" type="number" min="0" max="18" placeholder="bv. 8" />
        </div>
        <div>
          <label>Datum</label>
          <input name="datum" type="date" />
        </div>
      </div>
      <div className="filters-footer">
        <label>
          <input name="gratis" value="1" type="checkbox" /> Alleen gratis
        </label>
        <div style={{ flex: 1 }} />
        <button className="button" style={{ padding: "8px 18px", fontSize: "13px", borderRadius: "10px" }}>
          Filter
        </button>
      </div>
    </form>
  );
}
