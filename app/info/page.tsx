import { InfoTabs } from "@/components/InfoTabs";

export default async function InfoPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sp = await searchParams;
  const tab = sp.tab || "spelregels";

  return (
    <>
      <h1 className="page-title">Info</h1>
      <InfoTabs activeTab={tab} />
      {tab === "spelregels" && <Spelregels />}
      {tab === "colofon" && <Colofon />}
      {tab === "sponsors" && <Sponsors />}
      {tab === "disclaimer" && <Disclaimer />}
    </>
  );
}

function Spelregels() {
  return (
    <div className="info-section">
      <div className="spelregels-hero">
        <h2>Spelregels</h2>
        <p>
          Alle zomeractiviteiten in de ZomerPretPas zijn geldig van zaterdag 18
          juli t/m zondag 30 augustus 2026.
        </p>
      </div>
      <div className="info-card">
        <h3>Korting</h3>
        <p>
          ZomerPretPas biedt per activiteit één keer korting voor jezelf en soms
          voor je begeleider. De korting geldt niet in combinatie met andere
          kortingen.
        </p>
      </div>
      <div className="info-card">
        <h3>Kinderkorting</h3>
        <p>
          Bij de zomeractiviteiten staat de kinderkorting aangegeven. Indien er
          korting voor ouders/begeleider geldt, staat dit apart vermeld.
        </p>
      </div>
      <div className="info-card">
        <h3>Begeleiding</h3>
        <p>
          Vraag aan je ouders of begeleiders (18+) om met je mee te gaan op
          avontuur. Wanneer je zonder begeleiding komt, kan je geweigerd worden.
        </p>
      </div>
      <div className="info-card">
        <h3>Afmelden</h3>
        <p>
          Heb je je aangemeld voor een zomeractiviteit maar kun je niet komen,
          dan ben je verplicht om je af te melden.
        </p>
      </div>
      <div className="info-card">
        <h3>Wijzigingen</h3>
        <p>
          Er kunnen veranderingen zijn bij de zomeractiviteiten. Check onze
          website!
        </p>
      </div>
      <div className="info-card">
        <h3>Fotografie</h3>
        <p>
          Als je meedoet aan de zomeractiviteiten kun je gefotografeerd worden. De
          mogelijkheid bestaat dat deze foto&apos;s gebruikt worden voor
          publicaties. Geef ter plekke aan als je dit niet wilt.
        </p>
      </div>
      <div className="info-card">
        <h3>Eigen risico</h3>
        <p>
          Doe voorzichtig als je meedoet aan de activiteiten, als er iets
          gebeurt is dat voor eigen risico.
        </p>
      </div>
      <div className="info-highlight">
        <p>
          Wist je dat je met je ZomerPretPas ook de activiteiten van andere
          wijken kan doen? Je hoeft dus niet in je eigen wijk te blijven. Ontdek
          de hele stad!
        </p>
      </div>
    </div>
  );
}

function Colofon() {
  return (
    <div className="info-section">
      <div className="colofon-card">
        <h2>Colofon</h2>
        <div className="colofon-person">
          <div className="colofon-avatar" style={{ background: "#009EA0" }}>
            KD
          </div>
          <div>
            <div className="colofon-person-name">Kath Duin</div>
            <div className="colofon-person-role">ZomerPretPas Directeur</div>
          </div>
        </div>
        <div className="colofon-person">
          <div className="colofon-avatar" style={{ background: "#E6007E" }}>
            WW
          </div>
          <div>
            <div className="colofon-person-name">Willemijn Wüthrich</div>
            <div className="colofon-person-role">Grafisch ontwerper</div>
          </div>
        </div>
        <div className="colofon-person">
          <div className="colofon-avatar" style={{ background: "#F39200" }}>
            FB
          </div>
          <div>
            <div className="colofon-person-name">Felke Brouwer</div>
            <div className="colofon-person-role">Webdeveloper</div>
          </div>
        </div>
      </div>

      <div className="colofon-card">
        <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1a2e3a", marginBottom: "10px" }}>Credits</h3>
        <div className="credits-grid">
          <span className="credits-label">Ontwerp</span>
          <span className="credits-value">Willemijn Wüthrich</span>
          <span className="credits-label">Website</span>
          <span className="credits-value">Felke Brouwer</span>
          <span className="credits-label">Redactie</span>
          <span className="credits-value">Kath Duin</span>
          <span className="credits-label">Fotografie</span>
          <span className="credits-value">Organisaties, freeimages, pixabay, unsplash, pexels</span>
          <span className="credits-label">Drukwerk</span>
          <span className="credits-value">Dunnebier</span>
        </div>
      </div>

      <div className="colofon-card">
        <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1a2e3a", marginBottom: "8px" }}>Mede mogelijk gemaakt door</h3>
        <div className="colofon-tags">
          <span className="colofon-tag">Gemeente Amersfoort</span>
          <span className="colofon-tag">SchoolSport</span>
          <span className="colofon-tag">Ideenboom</span>
          <span className="colofon-tag">Bibliotheek Eemland</span>
        </div>
      </div>

      <div className="colofon-copyright">
        © ZomerPretPas 2026. Alle rechten voorbehouden.
      </div>
    </div>
  );
}

function Sponsors() {
  const sponsors = [
    "SIO", "Kunsthal KAdE", "Het Eemhuis", "Museum Amersfoort", "Intratuin",
    "Dierenpark Amersfoort", "DCA", "Bibliotheek Eemland", "Sport Coach",
    "Samen Werkplaats", "De Valikhof", "SKA", "De Kamers", "IJS Vathorst",
    "Het Groene Huis", "B.Slim", "LOUF", "Future Village", "Jong Juliana",
    "Wij-Kaart", "Emiclaer", "Class et cetera", "Ideenboom", "SchoolSport",
    "MediaLab", "InDeBuurt033", "Ontzorghuis", "Burgerweeshuis",
    "Wijkderij", "Levende Historie", "Sportclub Janmaat", "KVOA",
    "Wijkonderneming", "Balletuitvoering", "Sociaal Kwartier",
    "Speeltuinvereniging Het Kruidentuintje", "Eemlandhoeve",
    "Het Gooische Huis", "Metroom Amersfoort",
  ];

  return (
    <div className="info-section">
      <div className="sponsors-hero">
        <h2>Met dank aan alle aanbieders</h2>
        <p>Zonder deze organisaties was de ZomerPretPas niet mogelijk!</p>
      </div>
      <div className="sponsors-grid">
        {sponsors.map((s) => (
          <div key={s} className="sponsor-item">
            <span>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Disclaimer() {
  return (
    <div className="info-section">
      <div className="webapp-notice">
        <h3>Over deze web app</h3>
        <p>
          Deze web app is een eigen initiatief en staat volledig los van de
          officiële ZomerPretPas organisatie. We hebben de activiteiten uit het
          boekje digitaal beschikbaar gemaakt zodat je makkelijker kunt zoeken
          en filteren.
        </p>
        <p>
          Maar vergeet het echte boekje niet! Daarin vind je altijd de meest
          actuele en volledige informatie, inclusief leuke illustraties en extra
          tips. Pak je ZomerPretPas boekje erbij en ga op avontuur! 🎒
        </p>
      </div>

      <div className="disclaimer-card">
        <h2>Disclaimer</h2>
        <p>ZomerPretPas is niet verantwoordelijk en/of aansprakelijk voor:</p>
        <ul>
          <li>de aangeboden zomeractiviteiten</li>
          <li>
            voor schade/letsel die door derden aan goederen of personen is
            toegebracht
          </li>
          <li>
            voor aangeleverd beeldmateriaal en de daaruit mogelijk
            voortvloeiende gevolgen
          </li>
        </ul>
      </div>

      <div className="disclaimer-card">
        <h3>Contact &amp; social media</h3>
        <div className="contact-list">
          <div className="contact-item">
            <div className="contact-icon" style={{ background: "#1a2e3a" }}>
              🌐
            </div>
            <span className="contact-text">zomerpretpas.nl</span>
          </div>
          <div className="contact-item">
            <div className="contact-icon" style={{ background: "#1877f2" }}>
              f
            </div>
            <span className="contact-text">zomerpretpas</span>
          </div>
          <div className="contact-item">
            <div
              className="contact-icon"
              style={{
                background:
                  "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
              }}
            >
              ig
            </div>
            <span className="contact-text">@zomerpretpas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
