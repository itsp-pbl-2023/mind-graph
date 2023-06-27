import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"

const StyledTimer = styled.div`
  border-radius: 20px;
  border: 3px solid;
  background-color: var(--primary-color);

  min-width: 360px;
  font-size: 36px;
  font-family: 'Montserrat';
  font-weight: 700;
`

const msec2second = (msec: number): number => {
  return Math.floor(msec / 1000)
}

// 現在時刻との差分を取ることで残り秒数(msec)を計算
const calcRemain = (expire: Date): number => {
  const now = new Date()
  return expire.getTime() - now.getTime()
}

const Timer = ({ expire }: { expire: Date }) => {
  // 時間切れ
  const navigate = useNavigate()
  const onTimeUp = () => {
    navigate('/voting')
  }

  const [remain, setRemain] = useState(100)
  const renderRemain = useCallback(() =>
      window.requestAnimationFrame(() => {
        setRemain(calcRemain(expire))
        requestAnimationFrame(renderRemain)
      }),
    [expire],
  )

  // mount時処理
  useEffect(() => {
    const renderId = renderRemain()
    return () => cancelAnimationFrame(renderId)
  }, [renderRemain])

  useEffect(() => {
    if (remain <= 0) {
      console.log('Finish!')
      onTimeUp()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remain])

  return (
    <StyledTimer>
      <p> Timer : {msec2second(remain)} </p>
    </StyledTimer>
  )
}

export default Timer