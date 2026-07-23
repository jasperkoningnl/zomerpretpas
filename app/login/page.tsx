"use client";
import { createClient, supabaseConfigured } from "@/lib/supabase";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function LoginContent() {
  const searchParams = useSearchParams();
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const error = searchParams.get("error");

  useEffect(() => {
    if (!supabaseConfigured()) {
      setLoading(false);
      return;
    }
    createClient()
      .auth.getUser()
      .then(({ data }) => {
        setUser(data.user);
        setLoading(false);
      });
  }, []);

  async function google() {
    await createClient().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
  }

  async function magic(formData: FormData) {
    const email = String(formData.get("email"));
    const { error } = await createClient().auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });
    if (error) {
      alert("Er ging iets mis. Probeer het opnieuw.");
    } else {
      alert("Controleer je e-mail voor de loginlink.");
    }
  }

  async function logout() {
    await createClient().auth.signOut();
    setUser(null);
  }

  if (loading) {
    return (
      <section className="card">
        <p>Laden...</p>
      </section>
    );
  }

  if (user) {
    return (
      <section className="card">
        <h2>Ingelogd</h2>
        <p>
          Je bent ingelogd als <strong>{user.email}</strong>.
        </p>
        <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
          <a className="button" href="/">
            Naar activiteiten
          </a>
          <button className="button" onClick={logout}>
            Uitloggen
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>Inloggen</h2>
      {error === "auth" && (
        <p style={{ color: "#DC2626", marginBottom: "12px" }}>
          Inloggen is mislukt. Probeer het opnieuw.
        </p>
      )}
      {!supabaseConfigured() ? (
        <p>
          Supabase is nog niet ingesteld. Voeg NEXT_PUBLIC_SUPABASE_URL en
          NEXT_PUBLIC_SUPABASE_ANON_KEY toe als omgevingsvariabelen.
        </p>
      ) : (
        <>
          <button
            className="button"
            onClick={google}
            style={{ width: "100%", marginBottom: "16px" }}
          >
            Login met Google
          </button>
          <div
            style={{
              textAlign: "center",
              margin: "12px 0",
              color: "#9ca3af",
              fontSize: "14px",
            }}
          >
            of
          </div>
          <form action={magic}>
            <input
              name="email"
              type="email"
              placeholder="E-mailadres"
              required
              style={{ marginBottom: "10px" }}
            />
            <button className="button" style={{ width: "100%" }}>
              Stuur magic link
            </button>
          </form>
        </>
      )}
    </section>
  );
}

export default function Login() {
  return (
    <Suspense
      fallback={
        <section className="card">
          <p>Laden...</p>
        </section>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
