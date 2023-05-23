import { useQuery } from "@tanstack/react-query"

export const ThemeDisplay = () => {

  const theme = useQuery()

  return (
    <div>
      <h1>Theme Display</h1>
    </div>
  )
}