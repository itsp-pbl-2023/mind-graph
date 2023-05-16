import { useState } from "react"

const Button = ({ text }: { text: string }) => {
    const [count, setCount] = useState(0)
    const onClickHander = () => {
        setCount(count + 1)
    }
    return (
      <div onClick={onClickHander} style={{backgroundColor : "gray"}}>
        <span> { text } {count}</span>
      </div>
    )
  }
  
  export default Button
  