import Header from "./components/Header.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import UserProfile from "./screens/UserProfile.jsx";
import WelcomeScreen from "./screens/WelcomeScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import CreateCV from "./screens/CreateCV.jsx";
import CvLibrary from "./screens/CvLibrary.jsx";
import { UserProvider, UserContext } from "./context/UserContext.jsx";
import { useContext } from "react";

function App() {
  const { isAuthenticated } = useContext(UserContext) || {}; // Fallback to avoid destructure error

  return (
    <UserProvider>
      <div className="h-screen p-4 bg-gradient-to-t from-slate-500 to-sky-400">
        <Header />
        <Routes>
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/library" element={<CvLibrary />} />

          {/* le temps de créer le modèle de cv, je les met en public puis apres de nouveau restreint */}
          <Route path="/create_cv" element={<CreateCV />} />
          <Route path="/user" element={<UserProfile />} />
          {/* le temps de créer le modèle de cv, je les met en public puis apres de nouveau restreint */}

          {isAuthenticated ? (
            <>
              <Route path="/user" element={<UserProfile />} />
              <Route path="/" element={<WelcomeScreen />} />
              <Route path="/create_cv" element={<CreateCV />} />

              {/* Default authenticated route */}
              <Route path="*" element={<WelcomeScreen />} />
            </>
          ) : (
            // Default non-authenticated route
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
