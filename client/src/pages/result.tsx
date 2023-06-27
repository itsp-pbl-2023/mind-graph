import Button from '../components/button'
import { useNavigate } from 'react-router-dom'
import { ThemeDisplay } from '../components/common/ThemeDisplay'
import { getResult } from '../lib/state/result.ts'
import ShowWord from '../components/showWord.tsx'
import { useSetName } from '../lib/hooks/name.ts'

const Result = () => {
  const navigate = useNavigate()
  const setName = useSetName()

  const returnToTitle = () => {
    setName(undefined) // disconnect
    navigate('/title')
  }

  return (
    <div>
      <h1>Result</h1>
      <ThemeDisplay />
      <p>This is the result page</p>

      <ShowWord word={getResult()?.chosenNodeID} />

      <Button text='タイトルに戻る' onClick={returnToTitle} />
    </div>
  )
}

export default Result
  