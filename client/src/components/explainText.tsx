import styled from "styled-components"

const ExplainTextStyle = styled.ul`
  color: black;
  background-color: white;
  display:inline-block;
  border: 4px solid #B2D8F5;
  text-align: center;
  width: 50%;
  height: 15vw;
  margin-top: 10%;
  padding: 30px;
  padding-top: 6vw;
  z-align:10;
`

const ExplainText = ({ elements }: { elements: string[] }) => {

  const elementsList = elements.slice(1).map((element: string, id: number) => <li key={id}>{element}</li>)
  const elementTitle = elements[0]
  return (
    <div>
      <ExplainTextStyle>
        <h3>{ elementTitle }</h3>
        { elementsList }
      </ExplainTextStyle>
    </div>
  )
}

export default ExplainText
