import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    <div>
      <span>{msec2second(remain)}</span>
    </div>
  )
}

export default Timer