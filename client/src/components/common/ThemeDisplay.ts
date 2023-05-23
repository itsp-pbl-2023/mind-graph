import { useQuery } from "@tanstack/react-query"
import { theme } from "../lib/api/api-MindGraphService_connectquery"

export const ThemeDisplay = () => {
  const theme = useQuery(theme)

  useThemeStream(
    "",
    
  )

  return (
    <div>
      <h1>Theme Display</h1>
    </div>
  )
}