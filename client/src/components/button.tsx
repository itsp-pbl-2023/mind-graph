const Button = ({ text, onClick }: { text: string, onClick: Function }) => {

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
  