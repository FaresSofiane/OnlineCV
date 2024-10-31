import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { UserContext, UserProvider } from "./context/UserContext";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./components/Header.jsx";
import UserProfile from "./screens/UserProfile.jsx";
import CvLibrary from "./screens/CvLibrary.jsx";
import CreateCV from "./screens/CreateCV.jsx";
import ViewCV from "./screens/ViewCV.jsx";

const App = () => {
  return (
    <UserProvider>
      <UserConsumer /> {/* Utilise un composant enfant pour gérer la logique */}
    </UserProvider>
  );
};

// Un composant intermédiaire pour accéder au contexte après qu'il a été fourni
const UserConsumer = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen max-h-full p-4 bg-gradient-to-t from-slate-500 to-sky-400">
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />

          {/* Route protégée pour WelcomeScreen */}
          <Route
            path="/welcome"
            element={
              <ProtectedRoute>
                <WelcomeScreen />
              </ProtectedRoute>
            }
          />

          {/* Route protégée pour UserProfile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          {/* Redirection selon l'état de l'utilisateur */}
          <Route
            path="/"
            element={
              user ? <Navigate to="/welcome" /> : <Navigate to="/login" />
            }
          />

          <Route path="*" element={<h1>404 - Page non trouvée</h1>} />

          <Route
            path="/library"
            element={
              <ProtectedRoute>
                <CvLibrary />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create_cv"
            element={
              <ProtectedRoute>
                <CreateCV />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/view_cv/:cv_id"
            element={
              <ProtectedRoute>
                <ViewCV />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
