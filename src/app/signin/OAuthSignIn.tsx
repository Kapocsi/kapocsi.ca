"use client";

import { useState, useEffect, use } from "react";
import { signIn, LiteralUnion, ClientSafeProvider, getProviders } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { BuiltInProviderType } from "next-auth/providers/index";

export function OAuthSignIn() {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();

  useEffect(() => {
    const get = async () => {
      setProviders(await getProviders());
    };
    get();
  }, []);

  if (!providers) {
    return;
  }
  const p_list = Object.values(providers)
    .map((p) => p)
    .filter((p) => p.id !== "email");

  const icons = {
    google: <FaGoogle />,
    github: <FaGithub />,
  };

  return (
    <div className="grid gap-2">
      {p_list.map((p) => {
        return (
          <Button key={p.id} onClick={() => signIn(p.id)} variant="outline">
            {p.id === "google" ? <FaGoogle className="mr-2 h-4 w-4" /> : ""}
            {p.id === "github" ? <FaGithub className="mr-2 h-4 w-4" /> : ""}
            Sign In With {p.name}
          </Button>
        );
      })}
    </div>
  );
}
