declare type onClickHandler = () => void

const Button = ({ text, onClick }: { text: string, onClick: onClickHandler }) => {

    const onClickHander = () => {
        onClick();
    }

    return (
      <div onClick={onClickHander} style={{backgroundColor : "gray"}}>
        <span> { text } </span>
      </div>
    )
  }
  
  export default Button
  