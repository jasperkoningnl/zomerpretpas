import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "ZomerPretPas",
  description: "Doorzoek alle ZomerPretPas activiteiten in Amersfoort",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>
        <main className="shell">
          <header className="app-header">
            <Link href="/" className="logo">
              <span className="logo-icon">☀</span>
              <span className="logo-tekst">ZomerPretPas</span>
              <span className="logo-sub">Amersfoort 2026</span>
            </Link>
          </header>
          <nav className="nav">
            <Link href="/">Vandaag</Link>
            <Link href="/activiteiten">Alle activiteiten</Link>
            <Link href="/opgeslagen">Opgeslagen</Link>
            <Link href="/instellingen">Instellingen</Link>
            <Link href="/login">Account</Link>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
