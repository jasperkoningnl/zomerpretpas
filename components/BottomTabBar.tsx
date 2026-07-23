"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { icon: "🏠", label: "Vandaag", href: "/" },
  { icon: "📋", label: "Alles", href: "/activiteiten" },
  { icon: "♡", label: "Bewaard", href: "/opgeslagen" },
  { icon: "ℹ️", label: "Info", href: "/info" },
];

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="tab-bar">
      {tabs.map((tab) => {
        const isActive =
          tab.href === "/"
            ? pathname === "/"
            : pathname.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`tab-item${isActive ? " active" : ""}`}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
