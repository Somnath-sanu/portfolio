// import { FileText } from 'lucide-react'

import { GithubIcon, LinkedinIcon } from '@/components/hud/brand-icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { site, skills } from '@/data/copy'

export function Intro() {
  return (
    <section className="relative isolate min-h-svh overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-35"
        src="/video/leaves.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-background/70" />
      <div className="relative grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-28 sm:px-12 lg:px-16 xl:px-24">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">{site.role}</p>
          <h1 className="mt-4 font-serif text-5xl tracking-tight sm:text-6xl">{site.name}</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">{site.intro}</p>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {skills.map((item) => (
              <Badge key={item} variant="secondary">
                {item}
              </Badge>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href="#projects">Selected work</a>
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
            {/* <Button asChild variant="secondary">
              <a href={site.resume} target="_blank" rel="noreferrer">
                <FileText />
                Resume
              </a>
            </Button> */}
          </div>
        </div>
        <div className="relative min-h-[70vh] lg:min-h-svh">
          <img
            src="/images/hero.jpg"
            alt="A boy in a green studio with floating interface panels"
            className="drift absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  )
}
