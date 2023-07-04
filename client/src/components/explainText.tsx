import styled from "styled-components"

const ExplainTextStyle = styled.ul`
  color: black;
  background-color: white;
  border: 4px solid #B2D8F5;
  text-align: center;
  width: 240px;
  margin: 4px;
  padding: 60px;
  margin-left:1130px;

`

const ExplainText = ({ elements }: { elements: string[] }) => {

  const elementsList = elements.map((element: string, id: number) => <li key={id}>{element}</li>)

  return (
    <div>
      <ExplainTextStyle>
        <h3>投票しよう！</h3>
        { elementsList }
      </ExplainTextStyle>
    </div>
  )
}

export default ExplainText
