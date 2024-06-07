import "./profileAvatar.scss";
import avatar from "../../../resources/icons/defaultUserIcon.svg";
import { useState, useEffect } from "react";

const ProfileAvatar = ({ name }) => {
  const [profileImage, setProfileImage] = useState(avatar);
  const [initials, setInitials] = useState("");
  
  const nameToInitials = (name) => {
    let arr = name.split(' ');
    let word = arr[0][0].toUpperCase() + arr[1][0].toUpperCase();
    setInitials(word);
  }

  useEffect(() => {
    nameToInitials(name);
  }, [name])

  return (
    <>
      <span className="centered">
        {initials}
      </span>
      <img
        className="profile-image"
        // onMouseEnter={() => {
        //   setInitials("");
        //   setProfileImage(imageUploadIcon);
        // }}
        // onMouseLeave={() => {
        //   nameToInitials(name);
        //   setProfileImage(avatar);
        // }}
        src={profileImage}
        alt=""
      />
    </>
  )
}

export default ProfileAvatar;