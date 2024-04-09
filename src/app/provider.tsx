"use client";
import { SessionProvider } from "next-auth/react";

export function Provider({ children }: { children: React.ReactNode }) {
  try {
    return <SessionProvider>{children} </SessionProvider>;
  } catch {
    return <> {children}</>;
  }
}
