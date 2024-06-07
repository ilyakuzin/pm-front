import "./input.scss";

const Input = ({placeName, type, name, value, onBlur, onChange, valid}) => {
  return (
    <div className={!valid ? "input" : "inputWrong"}>
      <input 
        onChange={event => onChange(event)}
        onBlur={event => onBlur(event)} 
        value={value} 
        name={name} 
        type={type} 
        placeholder={placeName}
      />
    </div>
  )
}

export default Input;