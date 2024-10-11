import Header from "./components/Header.jsx";
import {Routes, Route} from "react-router-dom";
import UserProfile from "./screens/UserProfile.jsx";
import WelcomeScreen from "./screens/WelcomeScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import CreateCV from "./screens/CreateCV.jsx";


function App() {

  return (
      <>
          <div className="h-screen p-4 bg-gradient-to-t from-slate-500 to-sky-400">
              <div className="row">
                  <Header/>
              </div>
              <Routes>
                  <Route path="/user" element={<UserProfile/>}/>
                  <Route index path="/" element={<WelcomeScreen/>}/>
                  <Route path="/register" element={<RegisterScreen/>}/>
                  <Route path="/login" element={<LoginScreen/>}/>
                  <Route path="/create_cv" element={<CreateCV/>}/>
              </Routes>
          </div>
      </>
  )
}

export default App
