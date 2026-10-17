import { FileText, Mail } from 'lucide-react'

import { GithubIcon, LinkedinIcon } from '@/components/hud/brand-icons'
import { Button } from '@/components/ui/button'
import { site } from '@/data/copy'

export function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-30"
        src="/video/window.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-background/85" />
      <div className="relative mx-auto max-w-6xl px-6 py-28">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">Contact</p>
        <h2 className="mt-3 font-serif text-4xl tracking-tight">Let’s work together</h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Frontend, backend, or the queue between them. I’m looking for teams that ship.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <a href={`mailto:${site.email}`}>
              <Mail />
              Email
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={site.github} target="_blank" rel="noreferrer">
              <GithubIcon />
              GitHub
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={site.linkedin} target="_blank" rel="noreferrer">
              <LinkedinIcon />
              LinkedIn
            </a>
          </Button>
          <Button asChild variant="secondary">
            <a href={site.resume} target="_blank" rel="noreferrer">
              <FileText />
              Resume
            </a>
          </Button>
        </div>
        <p className="mt-8 font-mono text-xs text-muted-foreground">{site.email}</p>
      </div>
    </section>
  )
}
