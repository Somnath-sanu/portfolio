import { Contact } from '@/components/site/contact'
import { Intro } from '@/components/site/intro'
import { MusicButton } from '@/components/site/music-button'
import { Projects } from '@/components/site/projects'
import { site } from '@/data/copy'

export default function App() {
  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            href="#top"
            className="pointer-events-auto font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground"
          >
            {site.name}
          </a>
          <MusicButton />
        </div>
      </header>
      <main id="top">
        <Intro />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
