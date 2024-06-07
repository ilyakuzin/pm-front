import "./input.scss";

const Input = ({placeName, type, name, value, onBlur, onChange, valid, login}) => {
  return (
    <div className={!valid ? "input" : "inputWrong"}>
      <input 
        onChange={event => onChange(event)}
        onBlur={event => onBlur(event)} 
        value={value} 
        name={name} 
        type={type} 
        placeholder={placeName}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            login();
          }
        }}
      />
    </div>
  )
}

export default Input;