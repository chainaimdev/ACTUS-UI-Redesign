'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { ArrowRight, Pause, Play, Trophy } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { FadeUp } from '@/components/fade-up'
import { ShowcaseCard } from '@/components/home/showcase-card'
import {
  projectItems,
  projectsSection,
  useCaseItems,
  useCasesSection,
  winnerItems,
  winnersCarousel,
  winnersSection,
  type ShowcaseSectionCopy,
  type WinnerEntry,
} from '@/data/showcase'
import { cn } from '@/lib/utils'

/* ---------- Shared sub-section heading inside the box ---------- */

function SubHeading({ id, copy }: { id: string; copy: ShowcaseSectionCopy }) {
  return (
    <div className="mb-8 max-w-2xl">
      {copy.eyebrow && (
        <p className="mb-2 text-sm font-semibold tracking-widest text-brand uppercase">{copy.eyebrow}</p>
      )}
      <h2 id={id} className="text-2xl md:text-3xl">
        {copy.title}
      </h2>
      <div className="divider-gradient mt-4" aria-hidden="true" />
      {copy.description && <p className="mt-4 text-ink-muted">{copy.description}</p>}
    </div>
  )
}

/* ---------- Winner card ---------- */

function WinnerCard({ winner, index, total }: { winner: WinnerEntry; index: number; total: number }) {
  return (
    <article className="card-brand grid h-full overflow-hidden md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      {/* Left: award panel */}
      <div className="bg-brand-gradient relative flex min-h-44 flex-col justify-between gap-8 p-6 text-on-brand md:p-10">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold backdrop-blur-sm">
          <Trophy className="size-4" aria-hidden="true" />
          {winner.award}
        </span>
        <div>
          <span className="block font-heading text-6xl leading-none font-bold tabular-nums opacity-40 md:text-8xl" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="mt-2 block text-sm font-medium opacity-80">{`Winner ${index + 1} of ${total}`}</span>
        </div>
      </div>

      {/* Right: project details */}
      <div className="flex flex-col justify-center p-6 md:p-10">
        <p className="text-xs font-semibold tracking-widest text-ink-muted uppercase">{winner.edition}</p>
        <h3 className="mt-3 text-2xl md:text-3xl">{winner.project}</h3>
        <p className="mt-2 font-semibold text-brand">{winner.team}</p>
        <p className="mt-4 max-w-xl leading-relaxed text-ink-muted">{winner.summary}</p>
        {winner.href && (
          <Link
            href={winner.href}
            className="group mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
          >
            View project
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            <span className="sr-only">{`: ${winner.project}`}</span>
          </Link>
        )}
      </div>
    </article>
  )
}

/* ---------- Auto-sliding winners carousel ---------- */

function WinnersCarousel({
  autoplay = winnersCarousel.autoplay,
  intervalMs = winnersCarousel.intervalMs,
}: {
  autoplay?: boolean
  intervalMs?: number
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [selected, setSelected] = useState(0)
  const [snapCount, setSnapCount] = useState(0)
  const [playing, setPlaying] = useState(autoplay)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)

  // Respect reduced-motion: start paused, the visitor can still press play.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(false)
  }, [])

  useEffect(() => {
    if (!api) return
    const update = () => {
      setSnapCount(api.scrollSnapList().length)
      setSelected(api.selectedScrollSnap())
    }
    update()
    api.on('select', update)
    api.on('reInit', update)
    return () => {
      api.off('select', update)
      api.off('reInit', update)
    }
  }, [api])

  // Advance on a timer; pauses while hovered, focused, or the tab is hidden.
  useEffect(() => {
    if (!api || !playing || hovered || focused) return
    const id = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return
      // Wrap to the first winner when looping isn't possible (few slides on wide screens).
      if (api.canScrollNext()) api.scrollNext()
      else api.scrollTo(0)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [api, playing, hovered, focused, intervalMs])

  const togglePlay = useCallback(() => setPlaying((p) => !p), [])

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: 'start', loop: true }}
      aria-label="Winners of ACTUS projects"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false)
      }}
    >
      <CarouselContent className="-ml-5 py-2" aria-live={playing ? 'off' : 'polite'}>
        {winnerItems.map((winner, index) => (
          <CarouselItem
            key={winner.id}
            className="basis-full pl-5"
            aria-label={`${index + 1} of ${winnerItems.length}`}
          >
            <WinnerCard winner={winner} index={index} total={winnerItems.length} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? 'Pause automatic sliding' : 'Start automatic sliding'}
            className="inline-flex size-11 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-brand hover:text-brand"
          >
            {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
          </button>
          <div className="flex items-center gap-2" role="group" aria-label="Choose slide">
            {Array.from({ length: snapCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === selected ? 'true' : undefined}
                className={cn(
                  'h-2.5 rounded-full transition-all',
                  i === selected ? 'bg-brand-gradient w-8' : 'w-2.5 bg-silver/50 hover:bg-silver',
                )}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <CarouselPrevious className="static size-11 translate-x-0 translate-y-0 rounded-full border-border text-ink hover:border-brand hover:text-brand" />
          <CarouselNext className="static size-11 translate-x-0 translate-y-0 rounded-full border-border text-ink hover:border-brand hover:text-brand" />
        </div>
      </div>
    </Carousel>
  )
}

/* ---------- The combined box ---------- */

export function ShowcaseHub() {
  return (
    <section id="showcase" aria-label="ACTUS use cases, projects and winners" className="scroll-mt-20 bg-surface py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="rounded-3xl border border-border bg-elevated shadow-[0_1px_3px_rgb(var(--shadow-rgb)/0.06),0_24px_48px_-32px_rgb(var(--shadow-rgb)/0.25)]">
            <div id="use-cases" aria-labelledby="use-cases-heading" role="region" className="scroll-mt-24 p-6 sm:p-8 lg:p-12">
              <SubHeading id="use-cases-heading" copy={useCasesSection} />
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {useCaseItems.map((entry, index) => (
                  <li key={entry.id}>
                    <ShowcaseCard entry={entry} index={index} placeholderLabel="Use case" />
                  </li>
                ))}
              </ul>
            </div>

            <div
              id="projects"
              aria-labelledby="projects-heading"
              role="region"
              className="scroll-mt-24 border-t border-border p-6 sm:p-8 lg:p-12"
            >
              <SubHeading id="projects-heading" copy={projectsSection} />
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projectItems.map((entry, index) => (
                  <li key={entry.id}>
                    <ShowcaseCard entry={entry} index={index} placeholderLabel="Project" />
                  </li>
                ))}
              </ul>
            </div>

            <div
              id="winners"
              aria-labelledby="winners-heading"
              role="region"
              className="scroll-mt-24 rounded-b-3xl border-t border-border bg-surface/60 p-6 sm:p-8 lg:p-12"
            >
              <SubHeading id="winners-heading" copy={winnersSection} />
              <WinnersCarousel />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
