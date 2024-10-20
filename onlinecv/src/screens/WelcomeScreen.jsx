import { useEffect, useState } from "react";
import CvMosaic from "../components/CvMosaic.jsx";
const API_URL = "http://localhost:3002/api/cv/cvs";

export default function WelcomeScreen() {
    const [cvs, setCvs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Fonction pour filtrer les CVs
    const filteredCvs = cvs.filter(cvs =>
        cvs.persoContent.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cvs.persoContent.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function fetchCVs() {

        const headers = {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
        };
        fetch(API_URL, {
            method: "GET",
            headers,
        })
            .then(res => res.json())
            .then(data => {
                setCvs(data);
            })
            .catch(error => console.error('Error fetching user CVs:', error));
    }

    useEffect(() => {
        fetchCVs();
    }, []);

    return (
        <div className="p-16">
            <h1 className="text-2xl font-bold mb-4">Welcome to the app</h1>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Rechercher par prénom ou nom"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
                <CvMosaic cvs={filteredCvs}/>
            </div>
        </div>
    );
}