import "./navbar.scss";
import menuButton from "../../resources/icons/menuButton.svg";
import PlusButton from "../navbar/navbarComponents/button/PlusButton";
import Search from "./navbarComponents/search/Search";
import NavProfileAvatar from "./navbarComponents/profileAvatar/NavProfileAvatar";
import Logout from "./navbarComponents/logout/Logout";

const Navbar = ({ isOpen, onChange, name }) => {
  const UserData = window.localStorage.getItem('userData');
  const userData = JSON.parse(UserData);

  return (
    <div className="navbar">
      <div className={!isOpen ? 'menuButton' : 'menuButton-hidden'}>
        <img
          src={menuButton}
          alt=""
          onClick={() => {
            onChange(!isOpen);
          }}
        />
      </div>

      <div className="wrapper">

        {
          (userData.user.roles[0] === "ADMIN" || userData.user.roles[0] === "MANAGER") &&
          <PlusButton />
        }
        {/* {
          (userData.user.roles[0] === "ADMIN" || userData.user.roles[0] === "MANAGER") &&
          <Search />
        } */}

        <NavProfileAvatar name={name} />
        <Logout />
      </div>
    </div>
  )
}

export default Navbar;