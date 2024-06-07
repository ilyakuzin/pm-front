import "./CommonPage.scss";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import Home from "./home/Home";
import { Routes, Route } from "react-router-dom";
import Projects from "./projects/Projects";
import People from "./people/People";
import Profile from "./profile/Profile";
import UserProfile from "./userProfile/UserProfile";
import ProjectsDetails from "./projectsDetails/ProjectsDetails"
import Report from "./report/Report";
import { useState, useEffect } from "react";
import GetUserInfo from "../data/Users/GetUserInfo.ts";
import { useSelector } from 'react-redux';
import { selectAccessToken } from "../store/thisUserReducer";


const Page = () => {
  const token = useSelector(selectAccessToken);
  const [isOpen, setIsOpen] = useState(true);
  const [page, setPage] = useState(window.location.pathname);
  const [userData, setUserData] = useState();
  const [name, setName] = useState("Default User");

  const getUserInfo = async (id) => {
    let data = await GetUserInfo(token, id);
    setUserData(data);
  }

  useEffect(() => {
    const UserData = window.localStorage.getItem('userData');
    const userData = JSON.parse(UserData);
    if (userData.user.roles[0] === "MANAGER" || userData.user.roles[0] === "ADMIN") {
      getUserInfo(userData.user.id);
    } else {
      setUserData(userData);
    }
    setName(userData.user.firstName + " " + userData.user.surname + " " + userData.user.secondName);
  }, [token])

  return (
    <div className="page">
      <Sidebar isOpen={isOpen} onChange={setIsOpen} setChoosenPage={setPage} choosenPage={page}/>
      <div className="pageContainer">
        <Navbar isOpen={isOpen} onChange={setIsOpen} name={name}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:id" element={<ProjectsDetails />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/people/:id" element={<UserProfile userData={userData} setChoosenPage={setPage} />} />
          <Route path="/people" element={<People />} />
          <Route path='/report' element={<Report />} />
          <Route path="/profile"
            element={
              <Profile
                setChoosenPage={setPage}
                userData={userData}
              />
            } />
        </Routes>
      </div>
    </div>
  )
}

export default Page;