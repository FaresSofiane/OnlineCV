import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import CvMosaic from "../components/CvMosaic"; // Assurez-vous que le chemin est correct

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("cvs");

  return (
    <div className="flex items-center justify-center mt-14">
      <div className="w-[90vw] mx-auto p-8 space-y-6 bg-white rounded-lg shadow-md max-h-[80vh] overflow-y-auto">
        <h1 className="text-2xl font-bold text-center text-gray-700">
          User Profile
        </h1>
        <nav>
          <ul className="flex justify-center space-x-4">
            <li>
              <a
                href="#cvs"
                className={`font-bold text-gray-700 hover:text-sky-500 ${
                  activeTab === "cvs" ? "border-b-2 border-sky-500" : ""
                }`}
                onClick={() => setActiveTab("cvs")}
              >
                CVs
              </a>
            </li>
            <li>
              <a
                href="#personal-info"
                className={`font-bold text-gray-700 hover:text-sky-500 ${
                  activeTab === "personal-info"
                    ? "border-b-2 border-sky-500"
                    : ""
                }`}
                onClick={() => setActiveTab("personal-info")}
              >
                Informations Personnelles
              </a>
            </li>
          </ul>
        </nav>
        <hr className="my-6 border-t-2 border-gray-300" />
        {activeTab === "cvs" && <CvMosaic />}
        {activeTab === "personal-info" && (
          <Formik
            initialValues={{
              nom: "",
              prenom: "",
              age: "",
              email: "",
              photo: null,
            }}
            validationSchema={Yup.object({
              nom: Yup.string().required("Nom requis"),
              prenom: Yup.string().required("Prénom requis"),
              age: Yup.number().required("Âge requis").positive().integer(),
              email: Yup.string()
                .email("Adresse email invalide")
                .required("Email requis"),
              photo: Yup.mixed().required("Photo requise"),
            })}
            onSubmit={(values) => {
              console.log("Informations personnelles soumises:", values);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">
                  Informations personnelles
                </h3>
                <div className="flex flex-wrap">
                  <div className="form-group flex-1 w-1/2">
                    <label
                      htmlFor="nom"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nom:
                    </label>
                    <Field
                      className="w-1/2 px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                      type="text"
                      name="nom"
                      placeholder="Entrez votre nom"
                    />
                    <label
                      htmlFor="prenom"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Prénom:
                    </label>
                    <Field
                      className="w-1/2 px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                      type="text"
                      name="prenom"
                      placeholder="Entrez votre prénom"
                    />
                    <label
                      htmlFor="age"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Âge:
                    </label>
                    <Field
                      className="w-1/2 px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                      type="number"
                      name="age"
                      placeholder="Entrez votre âge"
                    />
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email:
                    </label>
                    <Field
                      className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                      type="email"
                      name="email"
                      placeholder="Entrez votre email"
                    />
                  </div>
                  <div className="w-32 ml-4 flex justify-end">
                    <div
                      className="w-32 h-48 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer"
                      onClick={() =>
                        document.getElementById("photoInput").click()
                      }
                      onDrop={(event) => {
                        event.preventDefault();
                        const file = event.dataTransfer.files[0];
                        setFieldValue("photo", file);
                      }}
                      onDragOver={(event) => event.preventDefault()}
                    >
                      {values.photo ? (
                        <img
                          src={URL.createObjectURL(values.photo)}
                          alt="Aperçu de la photo"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-500 text-center">
                          Cliquez ou glissez une photo ici
                        </span>
                      )}
                    </div>
                    <input
                      id="photoInput"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(event) => {
                        setFieldValue("photo", event.currentTarget.files[0]);
                      }}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 font-bold text-white bg-sky-500 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  Enregistrer
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}
