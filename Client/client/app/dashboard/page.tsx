"use client";

import { useEffect } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/store/authStore";
import { User } from "@/types/auth";

export default function Dashboard() {
  const { token, user, setAuth } = useAuth();

  useEffect(() => {
    if (!token) return;

    api<User>("/api/auth/me", "GET", undefined, token).then((u) =>
      setAuth(u, token),
    );
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
