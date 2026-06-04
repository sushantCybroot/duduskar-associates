"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    setIsLoading(false);

    if (!response.ok) {
      setMessage(data.message || "Login failed.");
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-lg border border-gold-500/25 bg-white p-8 shadow-luxury"
    >
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-700">
          Admin Access
        </p>
        <h1 className="mt-3 text-4xl text-dark-950">Secure Login</h1>
        <p className="text-dark-600">
          Enter your admin credentials to access the dashboard.
        </p>
      </div>

      <label className="mb-2 block text-sm font-semibold text-dark-800" htmlFor="username">
        Username
      </label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        disabled={isLoading}
        className="mb-5 w-full rounded-lg border border-dark-200 px-4 py-3 text-dark-950"
        required
      />

      <label className="mb-2 block text-sm font-semibold text-dark-800" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        disabled={isLoading}
        className="mb-5 w-full rounded-lg border border-dark-200 px-4 py-3 text-dark-950"
        required
      />

      {message && <p className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">{message}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-dark-950 px-5 py-3 font-semibold text-white transition hover:bg-gold-700 disabled:opacity-60"
      >
        {isLoading ? "Please wait..." : "Login"}
      </button>
    </form>
  );
}
