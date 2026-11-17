/**
 * Content for the "ACTUS Use cases" grid and "ACTUS Projects" carousel.
 *
 * PLACEHOLDER content — every entry below is an intentionally empty slot.
 * Fill in `title`, `description` and `href` when real content is ready;
 * the components render a placeholder state for any field left empty.
 */

export type ShowcaseEntry = {
  id: string
  /** Leave empty to render the placeholder label. */
  title: string
  description: string
  /** Leave empty ('') to hide the "Read more" link. */
  href: string
}

export type ShowcaseSectionCopy = {
  eyebrow?: string
  title: string
  description?: string
}

export const useCasesSection: ShowcaseSectionCopy = {
  eyebrow: 'In practice',
  title: 'ACTUS Use cases',
}

export const useCaseItems: ShowcaseEntry[] = [
  { id: 'use-case-1', title: '', description: '', href: '' },
  { id: 'use-case-2', title: '', description: '', href: '' },
  { id: 'use-case-3', title: '', description: '', href: '' },
  { id: 'use-case-4', title: '', description: '', href: '' },
]

export const projectsSection: ShowcaseSectionCopy = {
  eyebrow: 'Community',
  title: 'ACTUS Projects',
}

export const projectItems: ShowcaseEntry[] = [
  { id: 'project-1', title: '', description: '', href: '' },
  { id: 'project-2', title: '', description: '', href: '' },
  { id: 'project-3', title: '', description: '', href: '' },
  { id: 'project-4', title: '', description: '', href: '' },
  { id: 'project-5', title: '', description: '', href: '' },
]
