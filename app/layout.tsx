import "./globals.css";
import Link from "next/link";
export const metadata = { title: "ZomerPretPas", description: "Doorzoek alle ZomerPretPas activiteiten in Amersfoort" };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="nl"><body><main className="shell"><h1>ZomerPretPas Amersfoort 2026</h1><nav className="nav"><Link href="/">Vandaag</Link><Link href="/activiteiten">Alle activiteiten</Link><Link href="/opgeslagen">Opgeslagen</Link><Link href="/instellingen">Instellingen</Link><Link href="/login">Login</Link><Link href="/test-results">Tests</Link></nav>{children}</main></body></html>; }
