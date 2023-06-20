const explainText = ({ outline, elements }: { outline: string, elements: string[] }) => {

  const elementsList = elements.map(element => <li>{element}</li>)

  return (
    <div>
      <p> { outline } </p>
      <ul>
        { elementsList }
      </ul>
    </div>
  )
}

export default explainText
