// eslint-disable-next-line no-unused-vars
import React from "react";
import { Field, Form, Formik, FieldArray } from "formik";
import * as Yup from "yup";
import "./CreateCV.css"; // Ajout de l'importation du fichier CSS

export default function CreateCV() {
  return (
    <div className="flex items-center justify-center mt-14">
      <div className="w-[90vw] mx-auto p-8 space-y-6 bg-white rounded-lg shadow-md max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Créer votre CV
        </h2>
        <Formik
          initialValues={{
            nom: "",
            prenom: "",
            age: "",
            telephone: "", // Remplacement de "numero" par "telephone"
            email: "",
            adresse: "", // Ajout de l'adresse
            photo: null,
            formations: [],
            experiencesProfessionnelles: [],
            centresInterets: [], // Ajout de la section Centres d'intérêts
          }}
          onSubmit={(values) => {
            console.log("CV soumis:", values);
          }}
          validationSchema={Yup.object({
            nom: Yup.string().required("Nom requis"),
            prenom: Yup.string().required("Prénom requis"),
            age: Yup.number().required("Âge requis").positive().integer(),
            telephone: Yup.string().required("Téléphone requis"), // Remplacement de "numero" par "telephone"
            email: Yup.string()
              .email("Adresse email invalide")
              .required("Email requis"),
            adresse: Yup.string().required("Adresse requise"), // Validation pour l'adresse
            photo: Yup.mixed().required("Photo requise"),
            formations: Yup.array().of(
              Yup.object({
                diplome: Yup.string().required("Diplôme requis"),
                institution: Yup.string().required("Institution requise"),
                annee: Yup.string().required("Année requise"),
                description: Yup.string(),
              })
            ),
            experiencesProfessionnelles: Yup.array().of(
              Yup.object({
                poste: Yup.string().required("Poste requis"),
                entreprise: Yup.string().required("Entreprise requise"),
                duree: Yup.string().required("Durée requise"),
                description: Yup.string(),
              })
            ),
            centresInterets: Yup.array().of(
              Yup.object({
                titre: Yup.string().required("Titre requis"),
                description: Yup.string(),
                visibilite: Yup.string().required("Visibilité requise"),
              })
            ),
          })}
        >
          {({ values, isSubmitting, setFieldValue }) => (
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
                  <div className="form-group">
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
                  </div>
                  <div className="form-group">
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
                  </div>
                  <div className="form-group w-full">
                    <label
                      htmlFor="telephone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Téléphone:
                    </label>
                    <Field
                      className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                      type="text"
                      name="telephone"
                      placeholder="Entrez votre téléphone"
                    />
                  </div>
                  <div className="form-group w-full">
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
                  <div className="form-group w-full">
                    <label
                      htmlFor="adresse"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Adresse:
                    </label>
                    <Field
                      className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                      type="text"
                      name="adresse"
                      placeholder="Entrez votre adresse"
                    />
                  </div>
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
              <hr className="my-6 border-t-2 border-gray-300" />
              <FieldArray name="formations">
                {({ remove, push }) => (
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">
                      Formations
                    </h3>
                    {values.formations.map((_, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="text-md font-medium text-gray-600">
                          Formation {index + 1}
                        </h4>
                        <Field
                          className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                          name={`formations.${index}.diplome`}
                          placeholder="Diplôme"
                        />
                        <Field
                          className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                          name={`formations.${index}.institution`}
                          placeholder="Institution"
                        />
                        <Field
                          className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                          name={`formations.${index}.annee`}
                          placeholder="Année"
                        />
                        <Field
                          as="textarea"
                          className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                          name={`formations.${index}.description`}
                          placeholder="Description"
                        />
                        <button
                          type="button"
                          className="text-xs text-green-500"
                          onClick={() =>
                            console.log(
                              "Sauvegarde formation",
                              values.formations[index]
                            )
                          }
                        >
                          Sauvegarder cette formation
                        </button>
                        <button
                          type="button"
                          className="text-xs text-red-500 float-right"
                          onClick={() => remove(index)}
                        >
                          Supprimer
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="mt-2 text-xs text-blue-500"
                      onClick={() =>
                        push({
                          diplome: "",
                          institution: "",
                          annee: "",
                          description: "",
                        })
                      }
                    >
                      + Ajouter une formation
                    </button>
                  </div>
                )}
              </FieldArray>
              <hr className="my-6 border-t-2 border-gray-300" />
              <FieldArray name="experiencesProfessionnelles">
                {({ remove, push }) => (
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">
                      Expériences Professionnelles
                    </h3>
                    {values.experiencesProfessionnelles.map((_, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="text-md font-medium text-gray-600">
                          Expérience Professionnelle {index + 1}
                        </h4>
                        <Field
                          className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                          name={`experiencesProfessionnelles.${index}.poste`}
                          placeholder="Poste"
                        />
                        <Field
                          className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                          name={`experiencesProfessionnelles.${index}.entreprise`}
                          placeholder="Entreprise"
                        />
                        <Field
                          className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                          name={`experiencesProfessionnelles.${index}.duree`}
                          placeholder="Durée"
                        />
                        <Field
                          as="textarea"
                          className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                          name={`experiencesProfessionnelles.${index}.description`}
                          placeholder="Description"
                        />
                        <button
                          type="button"
                          className="text-xs text-green-500"
                          onClick={() =>
                            console.log(
                              "Sauvegarde expérience professionnelle",
                              values.experiencesProfessionnelles[index]
                            )
                          }
                        >
                          Sauvegarder cette expérience professionnelle
                        </button>
                        <button
                          type="button"
                          className="text-xs text-red-500 float-right"
                          onClick={() => remove(index)}
                        >
                          Supprimer
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="mt-2 text-xs text-blue-500"
                      onClick={() =>
                        push({
                          poste: "",
                          entreprise: "",
                          duree: "",
                          description: "",
                        })
                      }
                    >
                      + Ajouter une expérience professionnelle
                    </button>
                  </div>
                )}
              </FieldArray>
              <hr className="my-6 border-t-2 border-gray-300" />

              <FieldArray name="centresInterets">
                {({ remove, push }) => (
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">
                      Centres d&apos;intérêts
                    </h3>
                    {values.centresInterets.map((_, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="text-md font-medium text-gray-600">
                          Centre d&apos;intérêt {index + 1}
                        </h4>
                        <Field
                          className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                          name={`centresInterets.${index}.titre`}
                          placeholder="Titre"
                        />
                        <Field
                          as="textarea"
                          className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                          name={`centresInterets.${index}.description`}
                          placeholder="Description"
                        />
                        <button
                          type="button"
                          className="text-xs text-green-500"
                          onClick={() =>
                            console.log(
                              "Sauvegarde centre d'intérêt",
                              values.centresInterets[index]
                            )
                          }
                        >
                          Sauvegarder ce centre d&apos;intérêt
                        </button>
                        <button
                          type="button"
                          className="text-xs text-red-500 float-right"
                          onClick={() => remove(index)}
                        >
                          Supprimer
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="mt-2 text-xs text-blue-500"
                      onClick={() =>
                        push({
                          titre: "",
                          description: "",
                        })
                      }
                    >
                      + Ajouter un centre d&apos;intérêt
                    </button>
                  </div>
                )}
              </FieldArray>
              <hr className="my-6 border-t-2 border-gray-300" />
              <div>
                <h3 className="text-lg font-medium text-gray-700">
                  Choix de Visibilité
                </h3>
                <div className="form-group flex items-center">
                  <span className="mr-2">Privé</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={values.visibiliteGlobale === "public"}
                      onChange={() => {
                        const newVisibility =
                          values.visibiliteGlobale === "public"
                            ? "prive"
                            : "public";
                        setFieldValue("visibiliteGlobale", newVisibility);
                      }}
                    />
                    <span className="slider"></span>
                  </label>
                  <span className="ml-2">Public</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 font-bold text-white bg-sky-500 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  {isSubmitting ? "Enregistrement..." : "Enregistrer tout"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
