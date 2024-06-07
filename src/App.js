import './App.scss';
import CommonPage from './pages/CommonPage';
import {
  Routes,
  Route,
  useNavigate,
  useLocation
} from "react-router-dom";
import Authorization from './pages/authorization/Authorization';
import Registration from './pages/registration/Registration'
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './store/thisUserReducer';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loc = useLocation();
  const [isLoading, setLoading] = useState(true);
  const preload = () => {
    const UserData = window.localStorage.getItem('userData');
    if (!UserData && !loc.pathname.startsWith('/registration/')) {
      setLoading(false);
      navigate('/login');
    } else {
      if (!loc.pathname.startsWith('/registration/')) {
        const userData = JSON.parse(UserData);
        console.log(userData);
        dispatch(login({
          accessToken: userData.accessToken,
          refreshToken: userData.refreshToken,
          user: {
            id: userData.user.id,
            roles: userData.user.roles
          }
        }));
      }
      setLoading(false);
    }
  }
  useEffect(() => {
    preload();
  }, []);
  if (isLoading) {
    return (
      <div className="App">
        <p>Загрузка...</p>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Routes>
          <Route path='/login' element={<Authorization />} />
          <Route path='/forgot' element={<ForgotPassword />} />
          <Route path='/registration/:link' element={<Registration />} />
          <Route path='/*' element={<CommonPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
