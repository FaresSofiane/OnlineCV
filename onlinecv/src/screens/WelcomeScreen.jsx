import { useEffect } from "react";

const API_URL = "http://localhost:3000/api/user/cvs/public";

function getAuthHeaders(token) {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

function fetchUserCVs(headers) {
    fetch(API_URL, {
        method: "GET",
        headers,
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error fetching user CVs:', error));
}

export default function WelcomeScreen() {
    useEffect(() => {
        const token = localStorage.getItem("token");
        const headers = getAuthHeaders(token);
        fetchUserCVs(headers);
    }, []);

    return (
        <div>
            <h1>Welcome to the app</h1>
        </div>
    );
}