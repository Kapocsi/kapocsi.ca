"use client";

import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FaEnvelopeOpen } from "react-icons/fa";
import TurnStile from "./turnstile";
import { useMemo, useState } from "react";

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

export function SignInWithEmail() {
  const [token, setToken] = useState("");

  const formSchema = z.object({
    auth_email: z.string().email(),
    token: z.string().refine((val) => val.length > 0, { message: "Verification Required" }),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useMemo(() => {
    form.setValue("token", token);
  }, [token, form]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    signIn("email", { email: values.auth_email }, { turnstile: values.token });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
          <FormField
            control={form.control}
            name="auth_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="token"
            render={({ field }) => (
              <FormItem className="">
                <TurnStile setToken={setToken}></TurnStile>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant="outline">
            <FaEnvelopeOpen className="mr-2 h-4 w-4" /> Login with Email
          </Button>
          <FormMessage />
        </form>
      </Form>
    </>
  );
}
