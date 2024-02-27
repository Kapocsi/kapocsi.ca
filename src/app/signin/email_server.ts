"use server";

import { db } from "@/db";
import { turnStilePass, verificationTokens } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function verify_token(values: { auth_email: string; token: string }) {
  let turnStileForm = new FormData();

  turnStileForm.append("secret", process.env.TURN_SECRET as string);
  turnStileForm.append("response", values.token);
  const idempotencyKey = crypto.randomUUID();
  turnStileForm.append("idempotency_key", idempotencyKey);

  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const result = await fetch(url, {
    body: turnStileForm,
    method: "POST",
  });

  const outcome = await result.json();
  if (outcome.success) {
    await db
      .insert(turnStilePass)
      .values({ identifier: values.auth_email })
      .onDuplicateKeyUpdate({ set: { identifier: values.auth_email } });
    return "Pass";
  }
  return "Fail";
}
