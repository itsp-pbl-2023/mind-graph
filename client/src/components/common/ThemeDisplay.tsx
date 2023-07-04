import { useTheme } from '../../lib/hooks/theme.ts'
import styled from "styled-components";

const StyledUnderLine = styled.h1`
 border-bottom: 10px solid #B4C4FF;
`

export const ThemeDisplay = () => {
  const theme = useTheme()

  return (
    <div>
      <StyledUnderLine>{theme}</StyledUnderLine>
    </div>
  )
}