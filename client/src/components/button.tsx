declare type onClickHandler = () => void

const Button = (
    { text, 
      onClick,
      width}: { 
        text: string, 
        onClick: onClickHandler,
        width: string,
      },
    ) => {

    const onClickHander = () => {
        onClick();
    }

    return (
      <div  onClick={onClickHander} 
            style={{backgroundColor : "#B8B5D4",
                    border : "none",
                    borderRadius : "25px",
                    height : "30px",
                    width}}>
        <span style={{color: "black"}}> { text } </span>
      </div>
    )
  }
  
  export default Button
  