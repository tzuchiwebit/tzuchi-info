'use client'

import { ThemeProvider as Theme } from 'next-themes'

export function ThemeProvider({ children }) {
    return <Theme enableSystem={false}>{children}</Theme>
}
