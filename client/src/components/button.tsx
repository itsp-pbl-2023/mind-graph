import styled from "styled-components"

declare type onClickHandler = () => void

const ButtonStyle = styled.button`
  border-radius: 99px;
  border: 4px solid;
  padding: 0.5em 4em;
  font-family: inherit;
  background-color: var(--accent-color);
  cursor: pointer;
  transition: background-color 0.25s;
  margin: 4px;

  pointer-events: all;

  &:hover {
    background-color: var(--accent-color-hover);
  }
`

const Button = ({ text, onClick }: { text: string, onClick: onClickHandler }) => {

    const onClickHander = () => {
        onClick();
    }

    return (
      <ButtonStyle onClick={onClickHander}>
          { text }
      </ButtonStyle>
    )
  }
  
  export default Button
  