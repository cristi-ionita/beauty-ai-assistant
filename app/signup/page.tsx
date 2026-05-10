"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  async function signup() {
    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const normalizedEmail = email.trim().toLowerCase();

      const checkResponse = await fetch("/api/check-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
        }),
      });

      const checkData = await checkResponse.json();

      if (!checkResponse.ok) {
        setErrorMessage(checkData.error || "Could not check account.");
        return;
      }

      if (checkData.exists) {
        setErrorMessage(
          "An account already exists with this email. Please log in."
        );

        return;
      }

      const { error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,

        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      setEmail(normalizedEmail);
      setEmailSent(true);
    } catch (error) {
      console.error(error);
      setErrorMessage("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (emailSent) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-8 text-white sm:px-6">
        <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-5 text-center shadow-2xl sm:p-8">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-pink-500/10 text-2xl sm:h-16 sm:w-16 sm:text-3xl">
            ✉️
          </div>

          <h1 className="text-3xl font-black leading-tight sm:text-4xl">
            Check your email
          </h1>

          <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base">
            We sent a confirmation link to:
          </p>

          <p className="mt-2 break-words font-semibold text-pink-300">
            {email}
          </p>

          <p className="mt-6 text-sm leading-7 text-zinc-500 sm:text-base">
            Open the email and confirm your account to access your dashboard.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href="https://mail.google.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-pink-500 py-4 text-sm font-bold transition hover:bg-pink-400"
            >
              Open Gmail
            </a>

            <Link
              href="/login"
              className="rounded-xl border border-zinc-700 py-4 text-sm font-bold transition hover:bg-zinc-800"
            >
              Back to login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-8 text-white sm:px-6">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-5 shadow-2xl sm:p-8">
        <Link href="/" className="mb-8 inline-flex items-center gap-3">
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
        </Link>

        <h1 className="text-3xl font-black leading-tight sm:text-4xl">
          Create account
        </h1>

        <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
          Start generating business marketing content with AI.
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
            onClick={signup}
            disabled={loading}
            className="w-full rounded-xl bg-pink-500 py-4 text-sm font-bold transition hover:bg-pink-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          {errorMessage && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-300">
              {errorMessage}
            </div>
          )}
        </div>

        <Link
          href="/login"
          className="mt-6 block text-sm text-pink-300 hover:text-pink-200"
        >
          Already have an account? Login
        </Link>
      </div>
    </main>
  );
}