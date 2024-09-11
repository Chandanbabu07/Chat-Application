import "./App.css";
import HomePage from "./Components/HomePage";
import ChatPage from "./Components/ChatPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useNavigate,
} from "react-router-dom";
import { fetchuserInfo } from "./reduxdata/reduxstore/reduxslice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { fetchChats } from "./reduxdata/reduxstore/reduxslice";

function App() {
  const dispatch = useDispatch();

  // const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      if (window.location.pathname !== "/chats") {
        window.location.href = "/chats";
      }
    } else {
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
  }, []);

  // useEffect(() => {
  //   if (localStorage.getItem("userInfo")) {
  //     // dispatch(
  //   //   userLogin({
  //   //     email,
  //   //     password,
  //   //   })
  //   // );
  //   }

  // }, [dispatch]);

  useEffect(() => {
    const parsedData = JSON.parse(localStorage.getItem("userInfo"));
    const userId = parsedData && parsedData?._id;
    console.log("userId", userId); // userId should be a string

    if (userId) dispatch(fetchuserInfo({ userId })); // Pass userId directly
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/chats" element={<ChatPage></ChatPage>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
