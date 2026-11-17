import { cn } from '@/lib/utils'

// Placeholder mark — replace with the official ACTUS logo asset.
export function ActusLogo({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
        <defs>
          <linearGradient id={inverted ? 'logo-grad-inv' : 'logo-grad'} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={inverted ? '#FFFFFF' : 'var(--grad-from)'} />
            <stop offset="55%" stopColor={inverted ? 'var(--logo-inverted-mid)' : 'var(--grad-via)'} />
            <stop offset="100%" stopColor="var(--grad-to)" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill={`url(#${inverted ? 'logo-grad-inv' : 'logo-grad'})`} />
        <path d="M9 23 16 8l7 15M11.8 17.5h8.4" fill="none" stroke={inverted ? 'var(--footer-bg)' : 'var(--on-brand)'} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span
        className={cn(
          'font-heading text-xl font-bold tracking-tight',
          inverted ? 'text-white' : 'text-ink',
        )}
      >
        ACTUS
      </span>
    </span>
  )
}
