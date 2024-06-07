import logoutIcon from "../../../../resources/icons/logoutIcon.svg";
import "./logout.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAccessToken } from "../../../../store/thisUserReducer";
import logoutReq from "../../../../data/Auth/logout.ts";

const Logout = () => {
  const token = useSelector(selectAccessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutF=async ()=>{
    const ans=await logoutReq(token);
    console.log(ans);
    window.localStorage.removeItem('userData');
    dispatch(logout());
    navigate('/login');
  }

  return (
    <div className="logoutButton" onClick={()=>{logoutF()}}>
        <img src={logoutIcon} alt="" />
    </div>
  )
}

export default Logout;