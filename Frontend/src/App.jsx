import { useContext } from 'react';
import { UserContext } from './components/context/UserContext.jsx';
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import "./index.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Loading } from './components/UI/Loading.jsx';
import Navbar from './components/UI/Navbar.jsx';
import PinPage from './components/pages/PinPage.jsx';
import CreatePin from './components/pages/CreatePin.jsx';
import AccountPage from './components/pages/AccountPage.jsx';
import UserProfile from './components/pages/UserProfile.jsx';

function App() {
  const { isAuth, loading,user } = useContext(UserContext);

  
  if (loading) return <Loading/>; 
  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuth ? [<Navbar user={user}/>,<Home />] : <Navigate to="/login" />,
    },
    {
        path:'/create',
        element:isAuth? [<Navbar user={user}/>,<CreatePin/>] : <Login/>,
    },
    {
        path:'/account',
        element:isAuth? [<Navbar user={user}/>,<AccountPage user={user}/>] : <Login/>,
    },
    {
        path:'/user/:id',
        element:isAuth? [<Navbar user={user}/>,<UserProfile user={user}/>] : <Login/>,
    },
    {
      path: "/login",
      element: isAuth ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: isAuth ? <Navigate to="/" /> : <Register />,
    },
    {
      path: "/pin/:id",
      element: isAuth ? [<Navbar user={user}/>,<PinPage user={user}/>]:<Login/>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
