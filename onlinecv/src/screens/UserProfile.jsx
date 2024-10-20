
import {useEffect, useState} from "react";
import CvLibrary from "./CvLibrary.jsx"; // Assurez-vous que le chemin est correct

export default function UserProfile() {
    const [username, setUsername] = useState("John Doe");
    const [mail, setMail] = useState("");


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setUsername(user.username);
            setMail(user.email);
        }
    }, []);

  return (
    <div className="flex items-center justify-center mt-14">
      <div className="w-[90vw] mx-auto p-8 space-y-6 bg-white rounded-lg shadow-md max-h-[80vh] overflow-y-auto">
        <h1 className="text-2xl font-bold text-center text-gray-700">
Votre Compte        </h1>
        <hr className="my-6 border-t-2 border-gray-300" />

        <div className={"p-4"}>
          <h1 className={"text-xl my-2"}>Bonjour {username}</h1>
          <p className={"text-base my-2"}>Mail : {mail}</p>
        </div>


        <hr className="my-6 border-t-2 border-gray-300"/>
        <h2 className="text-2xl font-bold text-center text-gray-700">Vos CVs</h2>
        <div className={"grid gap-16"}>
          <CvLibrary />

        </div>
      </div>
    </div>
  );
}
