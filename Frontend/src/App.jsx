import { useContext } from 'react';
import { UserContext } from './components/context/UserContext.jsx';
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PinPage from './components/pages/PinPage.jsx';
import CreatePin from './components/pages/CreatePin.jsx';
import AccountPage from './components/pages/AccountPage.jsx';
import UserProfile from './components/pages/UserProfile.jsx';
import AppLayout from './components/Layout/AppLayout.jsx';
import LandingPage from './components/pages/LandingPage.jsx';
import { Loading } from './components/UI/Loading.jsx';


function App() {
  const { isAuth,user,loading } = useContext(UserContext);
  if (loading) {
    return <Loading/>
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: isAuth ? <Home /> : <LandingPage/>,
        },
        {
          path: "/login",
          element: isAuth ? <Home /> : <Login />,
        },
        {
          path: '/create',
          element: isAuth ? <CreatePin /> : <Login />,
        },
        {
          path: '/account',
          element: isAuth ? <AccountPage user={user} /> : <Login />,
        },
        {
          path: '/user/:id',
          element: isAuth ? <UserProfile user={user} /> : <Login />,
        },
        {
          path: "/register",
          element: isAuth ? <Home /> : <Register />,
        },
        {
          path: "/pin/:id",
          element: isAuth ? <PinPage user={user} /> : <Login />,
        },
      ]


    },
  ])

  return <RouterProvider router={router} />;
}

export default App;
