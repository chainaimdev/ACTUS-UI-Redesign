'use client'

import { ChevronDown, Palette } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/components/theme-provider'
import { getTheme, isThemeId } from '@/lib/themes'
import { cn } from '@/lib/utils'

function Swatch({ colors }: { colors: [string, string] }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block size-4 shrink-0 rounded-full ring-1 ring-border"
      style={{ background: `linear-gradient(135deg, ${colors[0]} 50%, ${colors[1]} 50%)` }}
    />
  )
}

export function ThemeSwitcher({
  className,
  showLabel = true,
  align = 'end',
}: {
  className?: string
  /** Show the current theme name next to the icon (hidden on very small screens either way). */
  showLabel?: boolean
  align?: 'start' | 'center' | 'end'
}) {
  const { theme, themes, setTheme } = useTheme()
  const current = getTheme(theme)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Change colour theme (current: ${current.label})`}
        className={cn(
          'inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-elevated px-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-surface hover:text-ink data-popup-open:bg-surface data-popup-open:text-ink',
          className,
        )}
      >
        <Palette className="size-4" aria-hidden="true" />
        {showLabel && <span className="hidden xl:inline">{current.label}</span>}
        <Swatch colors={current.swatch} />
        <ChevronDown className="size-3.5" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} sideOffset={8} className="w-52 border border-border p-1.5 shadow-xl">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={theme} onValueChange={(value) => isThemeId(value) && setTheme(value)}>
            {themes.map((t) => (
              <DropdownMenuRadioItem key={t.id} value={t.id} closeOnClick className="gap-2.5 py-2 pl-2">
                <Swatch colors={t.swatch} />
                {t.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
