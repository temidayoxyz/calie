"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button variant="ghost" className="mt-3 w-full" size="sm" onClick={handleCopy}>
      {copied ? (
        <>
          <Check className="h-4 w-4 text-success" />
          Copied
        </>
      ) : (
        "Copy link"
      )}
    </Button>
  );
}
