import { Link } from 'react-router-dom';


export default function Header() {
    return (
        <div
            className="w-[80vw] mx-auto bg-white/30 rounded-2xl p-4 backdrop-blur-2xl cursor-pointer h-16 flex justify-between items-center gap-x-10">
            <Link to={'/'} className="nav-link">
                <h1 className="text-2xl">
                    Online<span className="bg-green-400">CV</span>
                </h1>
            </Link>
            <Link to={"/user"} className="nav-link ml-auto">
                <h1 className="text-lg">
                    User 1
                </h1>
            </Link>
            <Link to={"/create_cv"} className="nav-link">
                <div className={"p-4 w-36 bg-red-400 rounded-2xl text-center items-center justify-center h-12"}>
                    <h1 className="text-lg">
                        Créer un CV
                    </h1>
                </div>

            </Link>
        </div>
    );
}