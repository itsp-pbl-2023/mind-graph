const explainText = ({ elements }: { elements: string[] }) => {

  const elementsList = elements.map(element => <li>{element}</li>)

  return (
    <div>
      <ul>
        { elementsList }
      </ul>
    </div>
  )
}

export default explainText
