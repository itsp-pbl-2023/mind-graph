declare type onClickHandler = () => void

interface Props {
  border: string;
  color: string;
  children?: React.ReactNode;
  height: string;
  onClick: () => void;
  radius: string
  width: string;
}

// const Button: React.FC<Props> = ({ 
//   border,
//   color,
//   children,
//   height,
//   onClick, 
//   radius,
//   width
// }) => { 
// return (
//   <button 
//     onClick={onClick}
//     style={{
//        backgroundColor: color,
//        border,
//        borderRadius: radius,
//        height,
//        width
//     }}
//   >
//   {children}
//   </button>
// );
// }

const Button = (
    { text, onClick }: { text: string, onClick: onClickHandler }
    
    ) => {

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
  