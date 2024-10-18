// CvPreview.jsx
import React from 'react';
import {ArrowRight} from "lucide-react";

export default function CvPreview({ username, id_cv }) {
    return (
        <div className="border border-gray-300 p-4 rounded-lg bg-white shadow-md">
            <h2 className="text-xl font-semibold">{username} à publié un cv </h2>
            <div className={"flex cursor-pointer"}>
            <p>Voir le CV </p>
            <ArrowRight />
            </div>
            {/* Ajoutez ici le design de votre CV */}
        </div>
    );
}