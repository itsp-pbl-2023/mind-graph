import { useTheme } from '../../lib/hooks/theme.ts'

export const ThemeDisplay = () => {
  const theme = useTheme()

  return (
    <div>
      <h1>{theme}</h1>
    </div>
  )
}