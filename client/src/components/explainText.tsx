const explainText = ({ elements }: { elements: string[] }) => {

  const elementsList = elements.map((element: string, id: number) => <li key={id}>{element}</li>)

  return (
    <div>
      <ul>
        { elementsList }
      </ul>
    </div>
  )
}

export default explainText
