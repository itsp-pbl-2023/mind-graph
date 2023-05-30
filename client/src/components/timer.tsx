import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Timer = ({expire} : {expire: Date}) => {
    const [remainSecond, setRemainSecond] = useState(100)

    const calcRemain = (() : number => {
        const now = new Date()
        return Math.floor(expire.getTime()/1000) - Math.floor(now.getTime()/1000)
    })()

    /**TODO 時間切れのときの実装 */
    const timeupHandler = () => {
        const navigate = useNavigate()
        navigate("./voting")
    }

    //読み込み時
    useEffect(() => {
        // 1秒ごとにいちいち再計算してる
        setRemainSecond(calcRemain)
        const id = setInterval(() => {
            setRemainSecond(() => {
                return calcRemain
            });
        }, 1000)

        // 1回分clearしないとダメらしい
        return () => {
            clearInterval(id)
        }
    },[])

    useEffect(() => {
        if(remainSecond == 0){
            console.log("Finish!")
            timeupHandler()
        }
    },[remainSecond])

    return (
        <div>
            <span> { calcRemain } </span>
        </div>
    )
}

export default Timer