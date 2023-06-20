import {ChangeEvent} from "react"

declare type onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => void

const Input = (
    { text, 
      onChange,
      width,
      value}: { 
        text: string, 
        onChange: onChangeHandler,
        width: string,
        value: string
      },
    ) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e);
    }

    return (
      <div  onChange={onChangeHandler} 
            style={{backgroundColor : "white",
                    border : "none",
                    borderRadius : "25px",
                    height : "30px",
                    width}}
            >
        <div contentEditable="true" style={{color: "grey"}}> { text } </div>
      </div>
    )
  }
  
  export default Input