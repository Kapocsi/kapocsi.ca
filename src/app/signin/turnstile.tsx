import { Skeleton } from "@/components/ui/skeleton";
import Script from "next/script";

import { Dispatch, SetStateAction, useEffect } from "react";

type RenderParameters = {
  sitekey: string;
  theme?: "light" | "dark";
  callback?(token: string): void;
};

declare global {
  interface Window {
    onloadTurnstileCallback(): void;
    turnstile: {
      render(container: string | HTMLElement, params: RenderParameters): void;
    };
  }
}

export default function ExplicitRender({ setToken }: { setToken: Dispatch<SetStateAction<string>> }) {
  useEffect(() => {
    window.onloadTurnstileCallback = function () {
      window.turnstile.render("#my-widget", {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_ID as string,
        callback: function (token) {
          setToken(token as string);
        },
      });
    };
  }, [setToken]);

  return (
    <>
      <Script id="cf-turnstile-callback"></Script>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
        async={true}
        defer={true}
      />
      <div id="my-widget" className="checkbox relative">
        <Skeleton className="h-[63px] last:block hidden" />
      </div>
    </>
  );
}
