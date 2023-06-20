import "./button.css"
declare type onClickHandler = () => void

const Button = ({ text, onClick }: { text: string, onClick: onClickHandler }) => {

    const onClickHander = () => {
        onClick();
    }

    return (
      <button onClick={onClickHander}>
        <span> { text } </span>
      </button>
    )
  }
  
  export default Button
  