import "./globals.css";
import { BottomTabBar } from "@/components/BottomTabBar";

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
        <div className="shell">
          <header className="app-header">
            <a href="/" className="logo">
              <span className="logo-icon">☀️</span>
              <div className="logo-text-wrap">
                <span className="logo-tekst">ZomerPretPas</span>
                <span className="logo-sub">Amersfoort 2026</span>
              </div>
            </a>
          </header>
          <div className="page-content">
            {children}
          </div>
          <BottomTabBar />
        </div>
      </body>
    </html>
  );
}
