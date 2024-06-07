import avatarIcon from "../../../../resources/icons/defaultUserIcon.svg";
import "./navProfileAvatar.scss";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const NavProfileAvatar = ({name}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [initials, setInitials] = useState("");
  const menuRef = useRef();

  useEffect(() => {
    nameToInitials(name);
    
    const handler = (event) => {
      if (!menuRef.current.contains(event.target)) {
        setMenuIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    }

  }, [name]);

  const nameToInitials = (name) => {
    let arr = name.split(' ');
    let word = arr[1][0].toUpperCase() + arr[0][0].toUpperCase(); 
    setInitials(word);
  }

  return (
    <div className="avatar" ref={menuRef}>
      <img 
        src={avatarIcon} 
        alt=""
        onClick={() => setMenuIsOpen(!menuIsOpen)}
      />
      <p 
        onClick={() => setMenuIsOpen(!menuIsOpen)}
      >{initials}</p>
      <ul className={menuIsOpen ? "menu-dropdown" : "menu-dropdown-hidden"} >
        <Link to="/profile" className="link"><li onClick={() => setMenuIsOpen(!menuIsOpen)}>Профиль</li></Link>
        <Link to="/login" className="link"><li onClick={() => setMenuIsOpen(!menuIsOpen)}>Выйти</li></Link>
      </ul>
    </div>
  )
}

export default NavProfileAvatar;