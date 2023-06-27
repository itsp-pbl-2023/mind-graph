import Button from '../components/button'
import { useNavigate } from 'react-router-dom'
import { ThemeDisplay } from '../components/common/ThemeDisplay'
import { getResult } from '../lib/state/result.ts'
import ShowYourScore from '../components/showYourScore.tsx'
import ShowMVP from '../components/showMVP.tsx'
import ShowWord from '../components/showWord.tsx'

const Result = () => {
  const navigate = useNavigate()
  const returnToTitle = () => {
    navigate('/title')
  }

  return (
    <div>
      <h1>Result</h1>
      <ThemeDisplay />
      <p>This is the result page</p>

      <div>{JSON.stringify(getResult()?.chosenNodeID)}</div>
      <ShowWord word={getResult()?.chosenNodeID} />
      <ShowMVP userID={getResult()?.mvpUserID} />
      <ShowYourScore score={getResult()?.myScore} />

      <Button text='タイトルに戻る' onClick={returnToTitle} />
    </div>
  )
}

export default Result
  