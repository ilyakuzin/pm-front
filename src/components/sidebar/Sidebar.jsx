import './Sidebar.css';
import { useState } from 'react';
import homeBlack from '../../resources/icons/homePage_Black.png';
import homeGrey from '../../resources/icons/homePage_Grey.png';
import projectsBlack from '../../resources/icons/projectsPage_Black.png';
import projectsGrey from '../../resources/icons/projectsPage_Grey.png';
import peopleBlack from '../../resources/icons/peoplePage_Black.png';
import peopleGrey from '../../resources/icons/peoplePage_Grey.png';
import reportBlack from '../../resources/icons/reportPage_Black.svg';
import reportGrey from '../../resources/icons/reportPage_Grey.svg';
import hideMenuButton from '../../resources/icons/hideMenuButton.svg';
import logo from "../../resources/icons/logo.svg";
import wave from "../../resources/icons/wave.png";
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, onChange, choosenPage, setChoosenPage }) {
    const [elementOnHover, setElementOnHover] = useState(null);
    const UserData = window.localStorage.getItem('userData');
    const userData = JSON.parse(UserData);

    setChoosenPage(window.location.pathname);

    return (
        <div className={isOpen ? 'sidebar' : 'sidebar-hidden'}>
            <div className='sidebar-logo'>
                <img
                    src={logo}
                    alt=""
                />
                <div className='sidebar-hide-menu-button'>
                    <img
                        src={hideMenuButton}
                        alt=""
                        onClick={() => {
                            onChange(!isOpen);
                        }}
                    />
                </div>
            </div>
            <div className='sidebar-nav'>
                <ul className='sidebar-nav--ul'>

                    {(userData.user.roles[0] !== "DEVELOPER" && userData.user.roles[0] !== "DESIGNER") && <li className='sidebar-nav--li'>
                        <Link to='/' className={
                            choosenPage === '/' ? 'sidebar-nav--element blackColor' : 'sidebar-nav--element'
                        }
                            onMouseEnter={() =>
                                setElementOnHover('/')
                            }
                            onMouseLeave={() =>
                                setElementOnHover(null)
                            }
                            onMouseDown={() =>
                                setChoosenPage('/')
                            }>
                            <img src={
                                choosenPage === '/' ? homeBlack : (elementOnHover === '/' ? homeBlack : homeGrey)
                            } alt='home' className='sidebar-nav--icon'></img>
                            <p>Главная</p>
                        </Link>
                    </li>}


                    {(userData.user.roles[0] !== "DEVELOPER" && userData.user.roles[0] !== "DESIGNER") && <li className='sidebar-nav--li'>
                        <Link to='/projects' className={
                            choosenPage === '/projects' ? 'sidebar-nav--element blackColor' : 'sidebar-nav--element'
                        }
                            onMouseEnter={() =>
                                setElementOnHover('/projects')
                            }
                            onMouseLeave={() =>
                                setElementOnHover(null)
                            }
                            onMouseDown={() =>
                                setChoosenPage('/projects')
                            }>
                            <img src={
                                choosenPage === '/projects' ? projectsBlack : (elementOnHover === '/projects' ? projectsBlack : projectsGrey)
                            } alt='projects' className='sidebar-nav--icon'></img>
                            <p>Проекты</p>
                        </Link>
                    </li>}
                    {(userData.user.roles[0] !== "DESIGNER") && <li className='sidebar-nav--li'>
                        <Link to='/report' className={
                            choosenPage === '/report' ? 'sidebar-nav--element blackColor' : 'sidebar-nav--element'
                        }
                            onMouseEnter={() =>
                                setElementOnHover('/report')
                            }
                            onMouseLeave={() =>
                                setElementOnHover(null)
                            }
                            onMouseDown={() =>
                                setChoosenPage('/report')
                            }>
                            <img src={
                                choosenPage === '/report' ? reportBlack : (elementOnHover === '/report' ? reportBlack : reportGrey)
                            } alt='report' className='sidebar-nav--icon'></img>
                            <p>Табель</p>
                        </Link>
                    </li>}

                    {(userData.user.roles[0] !== "DEVELOPER" && userData.user.roles[0] !== "DESIGNER") && 
                    <li className={userData.user.roles[0] === "DEVELOPER" || userData.user.roles[0] === "DESIGNER" ? 'sidebar-nav--li-centered' : 'sidebar-nav--li'}>

                        <Link to='/people' className={
                            choosenPage === '/people' ? 'sidebar-nav--element blackColor' : 'sidebar-nav--element'
                        }
                            onMouseEnter={() =>
                                setElementOnHover('/people')
                            }
                            onMouseLeave={() =>
                                setElementOnHover(null)
                            }
                            onMouseDown={() =>
                                setChoosenPage('/people')
                            }>
                            <img src={
                                choosenPage === '/people' ? peopleBlack : (elementOnHover === '/people' ? peopleBlack : peopleGrey)
                            } alt='people' className='sidebar-nav--icon'></img>
                            <p>Сотрудники</p>
                        </Link>
                    </li>}
                </ul>
            </div>
        </div>

    )
}