"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/store/authStore";
import { LoginResponse } from "@/types/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuth((s) => s.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      console.log("Attempting login with:", { email, password });

      const res = await api<LoginResponse>("/api/auth/login", "POST", {
        email,
        password,
      });

      console.log("Login successful:", res);

      setAuth(null, res.access);
      router.push("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Check console for details.");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={submit}>Login</button>
    </div>
  );
}
