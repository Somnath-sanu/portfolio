import { ExternalLink } from 'lucide-react'

import { GithubIcon } from '@/components/hud/brand-icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { archive, featured } from '@/data/projects'
import { cn } from '@/lib/utils'

export function Projects() {
  return (
    <section id="projects" className="relative isolate overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-30"
        src="/video/studio.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-background/85" />
      <div className="relative mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">Work</p>
      <h2 className="mt-3 font-serif text-4xl tracking-tight">Selected work</h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Six builds I keep pinned, then the other apps that are actually live.
      </p>
      <div className="mt-14 space-y-20">
        {featured.map((project, index) => (
          <article
            key={project.id}
            className="grid items-center gap-8 lg:grid-cols-2"
          >
            <div
              className={cn(
                'overflow-hidden rounded-3xl border border-white/10',
                index % 2 === 1 && 'lg:order-2',
              )}
            >
              <img
                src={project.image}
                alt=""
                className="drift aspect-[4/3] w-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-serif text-3xl tracking-tight">{project.title}</h3>
              <p className="mt-3 text-muted-foreground">{project.blurb}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                <span className="text-foreground">Problem. </span>
                {project.problem}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                <span className="text-foreground">Solution. </span>
                {project.solution}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <Badge key={item} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
              <div className="mt-6 flex gap-2">
                <Button asChild size="sm">
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <GithubIcon />
                    GitHub
                  </a>
                </Button>
                {project.live ? (
                  <Button asChild size="sm" variant="outline">
                    <a href={project.live} target="_blank" rel="noreferrer">
                      <ExternalLink />
                      {project.liveLabel ?? 'Live'}
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>

      <h3 className="mt-24 font-serif text-2xl">More live work</h3>
      <ul className="mt-6 divide-y divide-border rounded-2xl border border-border">
        {archive.map((project) => (
          <li key={project.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">{project.title}</p>
              <p className="text-sm text-muted-foreground">{project.blurb}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button asChild size="sm" variant="secondary">
                <a href={project.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </Button>
              {project.live ? (
                <Button asChild size="sm" variant="outline">
                  <a href={project.live} target="_blank" rel="noreferrer">
                    Live
                  </a>
                </Button>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
      </div>
    </section>
  )
}
