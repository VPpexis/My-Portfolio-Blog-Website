"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex w-full items-center gap-3 rounded-lg border bg-background px-4 py-3 text-sm font-mono transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 active:scale-[0.98]"
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      <span className="flex-1 text-left truncate">{email}</span>
      {copied ? (
        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 shrink-0">
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
          Copied!
        </span>
      ) : (
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          Copy
        </span>
      )}
    </button>
  )
}
