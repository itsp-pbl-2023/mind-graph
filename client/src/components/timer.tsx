import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Timer = ({expire} : {expire: Date}) => {
    const [remainSecond, setRemainSecond] = useState(100)

    // 現在時刻との差分を取ることで残り秒数(msec)を計算
    const calcRemain = () : number => {
        const now = new Date()
        const remain = expire.getTime() - now.getTime()

        if(remain <= 0){
            console.log("Finish!")
            timeupHandler()
        }
        return remain
    }

    const msec2second = (msec: number) :number => {
        return Math.floor(msec/1000)
    }

    const navigate = useNavigate()
    const timeupHandler = () => {
        navigate("/voting")
    }

    // mount時処理
    useEffect(() => {
        // 最初のレンダリング
        setRemainSecond(calcRemain)
        
        const render_remain = () => {
            window.requestAnimationFrame(() => {
                setRemainSecond(() => {
                    return calcRemain()
                });
                requestAnimationFrame(render_remain)
            })
        }
        render_remain()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div>
            <span> { msec2second(remainSecond) } </span>
        </div>
    )
}

export default Timer