"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function login() {
    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        setErrorMessage("Invalid email or password.");
        return;
      }

      window.location.replace("/dashboard");
    } catch (error) {
      console.error(error);
      setErrorMessage("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-8 text-white sm:px-6">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-5 shadow-2xl sm:p-8">
        <a href="/" className="mb-8 inline-flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 shadow-[0_0_30px_rgba(236,72,153,0.35)]">
            <span className="text-sm font-black text-white">B</span>
          </div>

          <div className="flex flex-col leading-none">
            <span className="bg-gradient-to-r from-white via-pink-100 to-pink-300 bg-clip-text text-lg font-black text-transparent">
              BusinessContent
            </span>

            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.32em] text-pink-400">
              AI SUITE
            </span>
          </div>
        </a>

        <h1 className="text-3xl font-black leading-tight sm:text-4xl">
          Login
        </h1>

        <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
          Access your content generator dashboard.
        </p>

        <div className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="field-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="field-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={login}
            disabled={loading}
            className="w-full rounded-xl bg-pink-500 py-4 text-sm font-bold transition hover:bg-pink-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {errorMessage && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </div>
          )}
        </div>

        <a
          href="/signup"
          className="mt-6 block text-sm text-pink-300 hover:text-pink-200"
        >
          Don&apos;t have an account? Sign up
        </a>
      </div>
    </main>
  );
}