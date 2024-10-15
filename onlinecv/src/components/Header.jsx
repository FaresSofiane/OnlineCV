import { Link } from 'react-router-dom';
import { UserContext } from "../context/UserContext.jsx";
import { useContext } from "react";

export default function Header() {
    const { getUserInfos, logout } = useContext(UserContext);
    const user = getUserInfos();

    return (
        <div className="w-[80vw] mx-auto bg-white/40 rounded-xl p-4 backdrop-blur-lg cursor-pointer h-20 flex justify-between items-center gap-x-10 shadow-lg">
            <div className="flex items-center space-x-4">
                <Link to={'/'} className="text-3xl font-bold text-gray-700">
                    Online<span className="bg-green-400 text-white px-1 rounded-lg">CV</span>
                </Link>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        className="w-64 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    />
                    <button className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                        🔍
                    </button>
                </div>
            </div>

            {user ? (
                <div className="flex items-center space-x-6">
                    <Link to="/create_cv" className="bg-red-400 hover:bg-red-500 text-white py-2 px-4 rounded-lg shadow-md">
                        Créer un CV
                    </Link>
                    <button onClick={logout} className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-md">
                        Déconnexion
                    </button>
                    <div className="bg-green-400 text-white py-2 px-4 rounded-full shadow-md">
                        {user.username}
                    </div>
                </div>
            ) : (
                <Link to="/login" className="bg-red-400 hover:bg-red-500 text-white py-2 px-4 rounded-lg shadow-md">
                    Login
                </Link>
            )}
        </div>
    );
}