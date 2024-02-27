import { redirect } from "next/navigation";
import { SignInWithEmail } from "./SignInWithEmail";
import { getServerSession } from "next-auth";
import { OAuthSignIn } from "./OAuthSignIn";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { authOptions } from "@/lib/authOptions";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/");
  }

  const Separator = ({ text }: { text: string }) => (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">{text}</span>
      </div>
    </div>
  );

  return (
    <div className="grid content-center h-max gap-6">
      <div>
        <Separator text="Sign In With Email"></Separator>
        <SignInWithEmail />
      </div>

      <Separator text="Or Continue With"></Separator>
      <OAuthSignIn />
    </div>
  );
}
