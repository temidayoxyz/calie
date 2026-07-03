"use client";

import { logout } from "@/lib/actions/auth";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  return (
    <form action={logout}>
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        className="w-full justify-start gap-3 px-3 text-muted hover:text-foreground"
      >
        <LogOut className="h-4 w-4" strokeWidth={1.5} />
        Sign out
      </Button>
    </form>
  );
}
