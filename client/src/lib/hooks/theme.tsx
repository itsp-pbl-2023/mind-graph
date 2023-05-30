import { ReactNode, createContext, useMemo, useState } from 'react'

type ThemeContextType = {
  theme?: string
  setTheme: (theme: string) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTheme: () => {} // no op
})

export interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<string>()
  const value = useMemo(() => {
    return { theme, setTheme }
  }, [theme, setTheme])
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}
