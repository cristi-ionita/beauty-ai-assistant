"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  async function signup() {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signUp({
        email,
        password,

        options: {
          emailRedirectTo:
            "https://beauty-ai-assistant-kappa.vercel.app/dashboard",
        },
      });

      if (error) {
        alert(error.message);
        return;
      }

      setEmailSent(true);
    } catch (error) {
      console.error(error);
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  }

  if (emailSent) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
        <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-pink-500/10 text-3xl">
            ✉️
          </div>

          <h1 className="text-3xl font-bold">
            Check your email
          </h1>

          <p className="mt-4 leading-7 text-zinc-400">
            We sent a confirmation link to:
          </p>

          <p className="mt-2 font-semibold text-pink-300">
            {email}
          </p>

          <p className="mt-6 leading-7 text-zinc-500">
            Open the email and confirm your account to access your dashboard.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href="https://mail.google.com"
              target="_blank"
              className="rounded-xl bg-pink-500 py-4 font-semibold hover:bg-pink-400"
            >
              Open Gmail
            </a>

            <a
              href="/login"
              className="rounded-xl border border-zinc-700 py-4 font-semibold hover:bg-zinc-800"
            >
              Back to login
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <h1 className="text-3xl font-bold">
          Create account
        </h1>

        <p className="mt-3 text-zinc-400">
          Start generating beauty marketing content with AI.
        </p>

        <div className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={signup}
            disabled={loading}
            className="w-full rounded-xl bg-pink-500 py-4 font-semibold hover:bg-pink-400 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </div>

        <a
          href="/login"
          className="mt-6 block text-sm text-pink-300"
        >
          Already have an account? Login
        </a>
      </div>
    </main>
  );
}