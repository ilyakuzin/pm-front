import "./button.scss";

const Button = ({ disState, setPass, value }) => {
  return (
    <div className="button">
      <button onClick={() => { setPass() }} className={disState ? 'unactive' : 'active'} disabled={disState}>{value}</button>
    </div>
  )
}

export default Button;