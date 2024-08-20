import { useState , useEffect } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from 'react-hot-toast';

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state : any) => state.user.user) || {};
  const loadUser = async () => {
    // try {
    //   const { data } = await axios.get("http://localhost:3000/api/v1/me", {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     withCredentials: true,
    //   });

    //   // console.log(data)

    //   if (data.user) {
    //     dispatch({ type: "SET_USER", payload: data.user });
    //     toggleLogin();
        
    //   } else {
    //     dispatch({ type: "CLEAR_USER" });
    //   }
    // } catch (err) {
    //   console.log(err)
    // }
  }

  useEffect(() => {
    loadUser();
    // toast.success('Welcome to KisaanSathi')
  }, [])



  const routes = [
    {
      path: "/",
      name : "Home",
    },
    {
      path: "/about",
      name : "About",
    }

  ]


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="flex min-h-screen flex-col items-center">
      <Router>

      <Toaster />


      <div className="mb-24 ">
      <Nav toggleLogin={toggleLogin} isLoggedIn={isLoggedIn} routes={routes} user={user} />


      </div>

      <Routes>
        <Route path="/" element={<Home />} />  
      </Routes>

      </Router>

    </div>
  );
}

export default App;