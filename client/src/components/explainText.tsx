const explainText = ({ outline, elements }: { outline: string, elements: string[] }) => {

  return (
    <div>
      <h3> { outline } </h3>
      <ul> 
        <li>{ elements }</li>
      </ul>
    </div>
  )
}

export default explainText
