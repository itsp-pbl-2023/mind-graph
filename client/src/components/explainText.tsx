import styled from "styled-components"

const ExplainTextStyle = styled.ul`
  display: inline-block;
  color: black;
  background-color: white;
  border: 4px solid #B2D8F5;
  text-align: center;
  width: 240px;
  margin: 4px;
  padding: 60px;

`

const ExplainText = ({ elements }: { elements: string[] }) => {

  const elementsList = elements.map(element => <li>{element}</li>)

  return (
    <div>
      <ExplainTextStyle>
        { elementsList }
      </ExplainTextStyle>
    </div>
  )
}

export default ExplainText
