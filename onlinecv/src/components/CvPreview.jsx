// CvPreview.jsx
import React from 'react';
import {ArrowRight} from "lucide-react";
import {useNavigate} from "react-router-dom";

export default function CvPreview({ username, id_cv }) {
    const navigate = useNavigate();

    return (
        <div className="border border-gray-300 p-4 w-full rounded-lg bg-white shadow-md">
            <h2 className="text-xl font-semibold">{username} à publié un cv </h2>
            <div
                className={"flex cursor-pointer"}
                onClick={() => navigate(`/view_cv/${id_cv}`)} // assuming each cv has an id field
            >
                <p>Voir le CV </p>
                <ArrowRight/>
            </div>
        </div>
    );
}