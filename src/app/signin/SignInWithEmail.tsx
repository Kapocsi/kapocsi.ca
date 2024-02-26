"use client";

import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FaEnvelopeOpen } from "react-icons/fa";

const formSchema = z.object({
  auth_email: z.string().email(),
});

export function SignInWithEmail() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    signIn("email", { email: values.auth_email });
  }

  return (
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
        <Button type="submit" variant="outline">
          <FaEnvelopeOpen className="mr-2 h-4 w-4" /> Login with Email
        </Button>
      </form>
    </Form>
  );
}
