"use client"

import { useState } from "react"
import { Mail, Send, ArrowRight, Copy, Check } from "lucide-react"
import { SiGithub } from "react-icons/si"
import { LinkedInIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import metadata from "@/data/metadata.json"

const contactMethods = [
  {
    label: "Email",
    value: metadata.socials.email,
    href: `mailto:${metadata.socials.email}`,
    icon: Mail,
    color: "from-amber-500 to-orange-600",
  },
  {
    label: "GitHub",
    value: "VPpexis",
    href: metadata.socials.github,
    icon: SiGithub,
    color: "from-gray-700 to-gray-900",
  },
  {
    label: "LinkedIn",
    value: "vanpanugan",
    href: metadata.socials.linkedin,
    icon: LinkedInIcon,
    color: "from-blue-600 to-blue-800",
  },
]

// ── Sub-components ──────────────────────────────────────────────

function InputField({
  label,
  name,
  type,
  placeholder,
  required,
}: {
  label: string
  name: string
  type: string
  placeholder: string
  required?: boolean
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="flex w-full rounded-xl border bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
      />
    </div>
  )
}

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="flex w-full items-center gap-3 rounded-xl border bg-background px-4 py-3 text-sm font-mono transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 active:scale-[0.98]"
    >
      <span className="flex-1 text-left truncate">{email}</span>
      {copied ? (
        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-500 shrink-0">
          <Check className="h-3.5 w-3.5" />
          Copied!
        </span>
      ) : (
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
          <Copy className="h-3.5 w-3.5" />
          Copy
        </span>
      )}
    </button>
  )
}

// ── Page ────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      {/* Decorative background blobs */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-24 sm:py-32">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-4">
            Get In Touch
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl antialiased">
            Let&apos;s build something{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              great together
            </span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Whether you have a project idea, a question, or just want to say hi —
            my inbox is always open.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left — contact cards */}
          <div className="lg:col-span-2 space-y-4">
            {contactMethods.map((method) => {
              const Icon = method.icon

              return (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.label === "Email" ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="group relative block rounded-2xl border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/30 overflow-hidden"
                >
                  {/* Colored accent bar on hover */}
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${method.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted group-hover:bg-primary/10 transition-colors duration-300">
                      <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-muted-foreground">
                        {method.label}
                      </p>
                      <p className="text-sm truncate">{method.value}</p>
                    </div>

                    <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </a>
              )
            })}

            {/* Quick copy email */}
            <div className="rounded-2xl border bg-card/50 p-5 backdrop-blur">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Quick copy
              </p>
              <CopyEmailButton email={metadata.socials.email} />
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border bg-card p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Send a message</h2>

              <form
                action="https://formspree.io/f/your-form-id"
                method="POST"
                className="space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <InputField
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <InputField
                  label="Subject"
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                  required
                />

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell me about your project, idea, or just say hello…"
                    className="flex w-full rounded-xl border bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all duration-200"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full group"
                >
                  <span className="flex items-center gap-2">
                    Send Message
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>

                <p className="text-xs text-center text-muted-foreground pt-2">
                  Powered by{" "}
                  <a
                    href="https://formspree.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-foreground transition-colors"
                  >
                    Formspree
                  </a>
                  {" "}— no spam, ever.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
