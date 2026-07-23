export default function Opgeslagen() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 className="page-title" style={{ padding: 0, marginBottom: "16px" }}>
        Opgeslagen
      </h1>
      <div className="opgeslagen-empty">
        <div className="opgeslagen-icon">♡</div>
        <div className="opgeslagen-title">Nog geen favorieten</div>
        <div className="opgeslagen-text">
          Tik op het hartje bij een activiteit om deze hier te bewaren.
        </div>
        <a href="/" className="button">
          Bekijk activiteiten
        </a>
      </div>
    </div>
  );
}
