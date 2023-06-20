declare type onClickHandler = () => void

const Button = ({ text, onClick }: { text: string, onClick: onClickHandler }) => {

    const onClickHander = () => {
        onClick();
    }

    return (
      <div  onClick={onClickHander} 
            style={{backgroundColor : "#B8B5D4",
                    border : "none",
                    borderRadius : "25px",
                    height : "30px",
                    }}>
        <span style={{color: "black"}}> { text } </span>
      </div>
    )
  }
  
  export default Button
  