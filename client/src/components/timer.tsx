import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Timer = ({expire} : {expire: Date}) => {
    const [remainSecond, setRemainSecond] = useState(100)

    // 現在時刻との差分を取ることで残り秒数を計算
    const calcRemain = () : number => {
        const now = new Date()
        return Math.floor(expire.getTime()/1000) - Math.floor(now.getTime()/1000)
    }

    const navigate = useNavigate()
    const timeupHandler = () => {
        navigate("/voting")
    }

    // mount時処理
    useEffect(() => {
        // 最初のレンダリング
        setRemainSecond(calcRemain)
        
        const id = setInterval(() => {
            setRemainSecond(() => {
                return calcRemain()
            });
        }, 1000)

        // 1回分clearしないとダメらしい
        return () => {
            clearInterval(id)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // 時間切れ時は自動遷移
    useEffect(() => {
        if(remainSecond <= 0){
            console.log("Finish!")
            timeupHandler()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[remainSecond])

    return (
        <div>
            <span> { remainSecond } </span>
        </div>
    )
}

export default Timer