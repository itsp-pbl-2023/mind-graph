import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const msec2second = (msec: number) :number => {
    return Math.floor(msec/1000)
}

// 現在時刻との差分を取ることで残り秒数(msec)を計算
const calcRemain = (expire: Date) : number => {
    const now = new Date()
    const remain = expire.getTime() - now.getTime()

    return remain
}

const Timer = ({expire} : {expire: Date}) => {
    const [remain, setRemain] = useState(100)
    // 時間切れ
    const navigate = useNavigate()
    const onTimeUp = () => {
        navigate("/voting")
    }

    // mount時処理
    useEffect(() => {
        // 最初のレンダリング
        setRemain(calcRemain(expire))
        
        const render_remain = () : void => {
            window.requestAnimationFrame(() => {
                setRemain(calcRemain(expire))
                requestAnimationFrame(render_remain)
            })
        }
        render_remain()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        if(remain <= 0){
            console.log("Finish!")
            onTimeUp()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [remain])

    return (
        <div>
            <span> { msec2second(remain) } </span>
        </div>
    )
}

export default Timer