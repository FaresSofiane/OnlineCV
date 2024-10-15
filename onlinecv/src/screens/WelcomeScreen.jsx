import { useEffect, useState } from "react";
import CvPreview from "../components/CvPreview.jsx";
const API_URL = "http://localhost:3002/api/cv/cvs";

export default function WelcomeScreen() {
    const [cvs, setCvs] = useState([]);

    function fetchUserCVs() {
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
        fetchUserCVs();
    }, []); // <- ajoutez un tableau de dépendances vide ici

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Welcome to the app</h1>
            <a onClick={() => {
                console.log(cvs);
            }}>log</a>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cvs.map((cv, index) => (
                    <CvPreview key={index} username={cv.UserCV.username} id_cv={cv._id} />
                ))}
                
            </div>
        </div>
    );
}