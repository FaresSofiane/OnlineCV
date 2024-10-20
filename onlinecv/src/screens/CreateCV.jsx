import React from "react";
import {Field, FieldArray, Form, Formik} from "formik";
import * as Yup from "yup";
import "./CreateCV.css"; // Ajout de l'importation du fichier CSS

export default function CreateCV() {
    const submitCV = async (values) => {

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cv/cv`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    private: values.private,
                    persoContent: {
                        nom: values.nom,
                        prenom: values.prenom,
                        date_naissance: values.date_naissance,
                        mail: values.email
                    },
                    expPedago: values.formations.map((formation) => ({
                        nom_diplome: formation.diplome,
                        certificateur: formation.institution,
                        date: formation.date,
                        commentaire: formation.description || ""
                    })),
                    expPro: values.experiencesProfessionnelles.map((experience) => ({
                        nom_entreprise: experience.entreprise,
                        poste_occupe: experience.poste,
                        date: experience.date,
                        commentaire: experience.description || ""
                    }))
                })
            });

            if (response.ok) {
                const result = await response.json();
                console.log('CV créé avec succès:', result);
                alert('CV créé avec succès');
            } else {
                const errorData = await response.json();
                console.error('Erreur lors de la création du CV:', errorData);
                alert('Erreur lors de la création du CV');
            }
        } catch (error) {
            console.error('Erreur réseau:', error);
            alert('Erreur réseau');
        }
    };

    return (
        <div className="flex items-center justify-center mt-14">
            <div className="w-[90vw] mx-auto p-8 space-y-6 bg-white rounded-lg shadow-md max-h-[75vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-center text-gray-700">
                    Créer votre CV
                </h2>
                <Formik
                    initialValues={{
                        nom: "",
                        prenom: "",
                        date_naissance: "",
                        email: "",
                        formations: [],
                        experiencesProfessionnelles: [],
                        private: true
                    }}
                    onSubmit={(values) => {
                        console.log("CV soumis:", values);
                        submitCV(values);
                    }}
                    validationSchema={Yup.object({
                        nom: Yup.string().required("Nom requis"),
                        prenom: Yup.string().required("Prénom requis"),
                        date_naissance: Yup.date().required("Date de naissance requise"),
                        email: Yup.string()
                            .email("Adresse email invalide")
                            .required("Email requis"),
                        formations: Yup.array().of(
                            Yup.object({
                                diplome: Yup.string().required("Diplôme requis"),
                                institution: Yup.string().required("Institution requise"),
                                date: Yup.date().required("Date requise"),
                                description: Yup.string(),
                            })
                        ),
                        experiencesProfessionnelles: Yup.array().of(
                            Yup.object({
                                poste: Yup.string().required("Poste requis"),
                                entreprise: Yup.string().required("Entreprise requise"),
                                date: Yup.date().required("Date requise"),
                                description: Yup.string(),
                            })
                        ),
                    })}
                >
                    {({ values, isSubmitting, setFieldValue }) => (
                        <Form className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-700">
                                Informations personnelles
                            </h3>
                            <div className="form-group">
                                <label
                                    htmlFor="nom"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Nom:
                                </label>
                                <Field
                                    className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                                    type="text"
                                    name="nom"
                                    placeholder="Entrez votre nom"
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="prenom"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Prénom:
                                </label>
                                <Field
                                    className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                                    type="text"
                                    name="prenom"
                                    placeholder="Entrez votre prénom"
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="date_naissance"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Date de Naissance:
                                </label>
                                <Field
                                    className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                                    type="date"
                                    name="date_naissance"
                                />
                            </div>
                            <div className="form-group">
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

                            <hr className="my-6 border-t-2 border-gray-300" />
                            <FieldArray name="formations">
                                {({ remove, push }) => (
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-700">
                                            Formations
                                        </h3>
                                        {values.formations.map((_, index) => (
                                            <div key={index} className="space-y-2">
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
                                                    type="date"
                                                    name={`formations.${index}.date`}
                                                />
                                                <Field
                                                    as="textarea"
                                                    className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                                                    name={`formations.${index}.description`}
                                                    placeholder="Description"
                                                />
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
                                                    date: "",
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
                                                    type="date"
                                                    name={`experiencesProfessionnelles.${index}.date`}
                                                />
                                                <Field
                                                    as="textarea"
                                                    className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                                                    name={`experiencesProfessionnelles.${index}.description`}
                                                    placeholder="Description"
                                                />
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
                                                    date: "",
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
                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-700">
                                    Visibilité :
                                </label>
                                <div className="flex items-center">
                                    <Field
                                        type="checkbox"
                                        name="private"
                                        checked={values.private}
                                        onChange={() => setFieldValue("private", !values.private)}
                                        className="mr-2"
                                    />
                                    <span>{values.private ? "Privé" : "Public"}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <button
                                    type="submit"
                                    disabled={false}
                                    className="w-full px-4 py-2 font-bold text-white bg-sky-500 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                >
                                    {isSubmitting ? "Enregistrement..." : "Enregistrer"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}