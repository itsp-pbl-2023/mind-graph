import { useEffect, useState } from "react"

const Timer = ({expire} : {expire: Date}) => {
    const [remain, setRemain] = useState(0)

    const calcRemain = () : number => {
        const now = new Date()
        return Math.floor(expire.getTime()/1000) - Math.floor(now.getTime()/1000)
    }
    useEffect(() => {
        const id = setInterval(() => {
            setRemain(() => {
                return calcRemain()
            });
        }, 1000)

        // 1回分clearしないとダメらしい
        return () => {
            clearInterval(id)
        }
    },[])

    return (
        <div>
            <span> { remain } </span>
        </div>
    )
}

export default Timer