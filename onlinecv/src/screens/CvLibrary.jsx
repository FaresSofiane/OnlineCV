// CvMosaicWrapper.jsx
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/UserContext.jsx";
import {useNavigate} from "react-router-dom";

const VITE_API_URL = `http://onlinecv-production.up.railway.app/api/cv/cv_of_user`;




export default function CvLibrary() {
    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const [cvs, setCvs] = useState([]);


    function fetchUserCVs() {

        const headers = {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
        };
        fetch(VITE_API_URL, {
            method: "GET",
            headers,
        })
            .then(res => res.json())
            .then(data => {
                setCvs(data);
                console.log(data);
            })
            .catch(error => console.error('Error fetching user CVs:', error));
    }

    useEffect(() => {
        fetchUserCVs();
    }, []);


    const CvMosaic = ({cvs}) => {
        // Ensure cvs is an array
        const cvsArray = Array.isArray(cvs) ? cvs : [];

        console.log(cvsArray);

        if (cvsArray.length === 0) {
            return (
                <div className="text-center">Aucun CV trouvé</div>
            );
        }

        return (
            <>
                {cvs.map((cv,index) => (
                    <div key={index} className="border border-gray-300 p-4 w-full rounded-lg bg-white shadow-md m-4" >
                        <h2 className="text-xl font-semibold">CV {index}</h2>
                        <div
                            className={"flex cursor-pointer"}
                            onClick={() => navigate(`/view_cv/${cv._id}`)} // assuming each cv has an id field
                        >
                            <p>Voir le CV </p>
                        </div>
                    </div>
                ))}
            </>
        );
    }


  return (
    <div className={""}>
      <h1 className={"text-white text-2xl font-bold"}>Mes CVs :</h1>

        <div className={"gap-4"}>
            <CvMosaic cvs={cvs.cvs} />

        </div>

    </div>
  );
}
