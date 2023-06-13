import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Timer = ({expire} : {expire: Date}) => {
    const [remain, setRemain] = useState(100)

    // 時間切れ
    const navigate = useNavigate()
    const onTimeUp = () => {
        navigate("/voting")
    }

    var flag = true
    // 現在時刻との差分を取ることで残り秒数(msec)を計算
    const updateRemain = () : number => {
        const now = new Date()
        const remain = expire.getTime() - now.getTime()

        if(flag && remain <= 0){
            console.log("Finish!")
            flag = false
            onTimeUp()
        }
        return remain
    }

    const msec2second = (msec: number) :number => {
        return Math.floor(msec/1000)
    }

    // mount時処理
    useEffect(() => {
        // 最初のレンダリング
        setRemain(updateRemain)
        
        const render_remain = () : void => {
            window.requestAnimationFrame(() => {
                setRemain(() => {
                    return updateRemain()
                })
                requestAnimationFrame(render_remain)
            })
        }
        render_remain()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div>
            <span> { msec2second(remain) } </span>
        </div>
    )
}

export default Timer