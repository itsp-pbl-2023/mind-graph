import styled from "styled-components"

const ExplainTextStyle = styled.ul`
  color: black;
  background-color: white;
  border: 4px solid #B2D8F5;
  text-align: center;
  width: 20vw;
  margin: 4px;
  padding: 60px;
  position: absolute;
  right: 0;
`

const ExplainText = ({ elements }: { elements: string[] }) => {

  const elementsList = elements.map((element: string, id: number) => <li key={id}>{element}</li>)

  return (
    <div>
      <ExplainTextStyle>
        <h3>{ elementsList[0]}</h3>
        { elementsList.slice(1) }
      </ExplainTextStyle>
    </div>
  )
}

export default ExplainText
