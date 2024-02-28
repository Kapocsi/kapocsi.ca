import { NextRequest, NextResponse } from "next/server";

async function check_turnstile(token: string | null) {
  if (!token) {
    return false;
  }

  let turnStileForm = new FormData();

  turnStileForm.append("secret", process.env.TURN_SECRET as string);
  turnStileForm.append("response", token);
  const idempotencyKey = crypto.randomUUID();
  turnStileForm.append("idempotency_key", idempotencyKey);

  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const result = await fetch(url, {
    body: turnStileForm,
    method: "POST",
  });

  const outcome = await result.json();
  return outcome.success;
}

export async function middleware(req: NextRequest) {
  // Prevents usage of the email login methode without turnstile verification
  if (!(await check_turnstile(req.nextUrl.searchParams.get("turnstile")))) {
    return NextResponse.error();
  }
}
export const config = {
  matcher: "/api/auth/signin/email:path*",
};
