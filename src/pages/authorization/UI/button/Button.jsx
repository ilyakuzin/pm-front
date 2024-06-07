import "./button.scss";

const Button = ({ disState,login, value}) => {
  return (
    <div className="button">
        <button 
          onClick={()=> login()} 
          disabled={disState}
          >{value}</button>
    </div>
  )
}

export default Button;