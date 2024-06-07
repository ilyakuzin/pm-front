import React from "react";
import "./button.scss";

const Button = ({classNamePrefix, label, isDisabled, onClick}) => {
  return (
    <div className={isDisabled ? (classNamePrefix ? classNamePrefix+"-disabled" : "button-disabled") : (classNamePrefix ? classNamePrefix : "buttons")}>
      {onClick !== undefined  && <button onClick={onClick}>{label}</button>}
      {onClick === undefined && <button>{label}</button>}
    </div>
  )
}

export default Button;