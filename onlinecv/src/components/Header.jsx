import {Link} from "react-router-dom";
import {UserContext} from "../context/UserContext.jsx";
import {useContext} from "react";

export default function Header() {
  const { getUserInfos, logout } = useContext(UserContext);
  const user = getUserInfos();

  return (
      <>
        <div className="w-[80vw] mx-auto bg-white/40 rounded-xl p-4 backdrop-blur-lg cursor-pointer h-20 flex justify-between items-center gap-x-10 shadow-lg">
          <div className="flex items-center space-x-4">
            <Link to={"/"} className="text-3xl font-bold text-gray-700">
              Online
              <span className="bg-green-400 text-white px-1 rounded-lg">CV</span>
            </Link>

          </div>

          {user ? (
              <div className="flex items-center space-x-6">
                <button
                    onClick={logout}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-md"
                >
                  Déconnexion
                </button>
                <div className="bg-green-400 text-white py-2 px-4 rounded-full shadow-md">
                  {user.username}
                </div>
              </div>
          ) : (
              <Link
                  to="/login"
                  className="bg-red-400 hover:bg-red-500 text-white py-2 px-4 rounded-lg shadow-md"
              >
                Login
              </Link>
          )}
        </div>

        {/* Ajout de la navbar */}

        {user ? (

            <nav className="w-[80vw] mx-auto mt-4 bg-white/40 rounded-xl p-4 backdrop-blur-lg shadow-lg">
              <ul className="flex justify-around">
                <li>
                  <Link to="/welcome" className="text-gray-700 hover:text-gray-900">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link to="/create_cv" className="text-gray-700 hover:text-gray-900">
                    Créer un CV
                  </Link>
                </li>
                <li>
                  <Link to="/user" className="text-gray-700 hover:text-gray-900">
                    Compte
                  </Link>
                </li>
              </ul>
            </nav>
        ) : null
        }

      </>
  );
}