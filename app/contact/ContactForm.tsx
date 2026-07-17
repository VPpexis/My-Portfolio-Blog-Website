"use client"

import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  return (
    <div className="rounded-xl border bg-card p-6 sm:p-8 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Send a message</h2>

      <form
        action="https://formspree.io/f/mgogazvj"
        method="POST"
        className="space-y-5"
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            name="subject"
            type="text"
            placeholder="What's this about?"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="Tell me about your project, idea, or just say hello…"
          />
        </div>

        <Button type="submit" size="lg" className="w-full group">
          <span className="flex items-center gap-2">
            Send Message
            <Send
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
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
          </a>{" "}
          — no spam, ever.
        </p>
      </form>
    </div>
  )
}
