import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";

export default function ViewCV() {
    const { cv_id } = useParams();
    const navigate = useNavigate();
    const [cv, setCv] = useState(null);
    const [isEditing, setIsEditing] = useState({});
    const [isCreator, setIsCreator] = useState(false);
    const [commentaires, setCommentaires] = useState([]);

    useEffect(() => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
        };
        fetch(`${import.meta.env.VITE_API_URL}/api/cv/cv/${cv_id}`, {
            method: "GET",
            headers,
        })
            .then((response) => response.json())
            .then((data) => {
                setCv(data);
                console.log(data);
                setIsCreator(data.isCreator);
                setCommentaires(data.commentaires);
            })
            .catch((error) =>
                console.error("Erreur lors du chargement des données", error)
            );
    }, [cv_id]);

    const handleEditToggle = (section) => {
        setIsEditing((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };


    const handleSaveSection = (values, section) => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
        };
        fetch(`${import.meta.env.VITE_API_URL}/api/cv/cv/${cv_id}/section`, {
            method: "PUT",
            headers,
            body: JSON.stringify({
                sectionType: section.type,
                sectionId: section.id,
                sectionData: values,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.updatedSection) {
                    window.location.reload(); // Recharge la page
                }
            })
            .catch((error) => console.error("Erreur lors de la sauvegarde", error));
    };

    const handleAddComment = (values) => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
        };
        fetch(`${import.meta.env.VITE_API_URL}/api/cv/cv/${cv_id}/commentaires`, {
            method: "POST",
            headers,
            body: JSON.stringify({
                content: values.content,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.commentaire) {
                    setCommentaires((prev) => [...prev, data.commentaire]);
                }
            })
            .catch((error) =>
                console.error("Erreur lors de l'ajout du commentaire", error)
            );
    };

    const handleDeleteSection = (type, sectionId) => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
        };
        fetch(`${import.meta.env.VITE_API_URL}/api/cv/cv/${cv_id}/section`, {
            method: "DELETE",
            headers,
            body: JSON.stringify({
                sectionType: type,
                sectionId: sectionId,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'Section deleted successfully') {
                    window.location.reload(); // Reload the page
                }
            })
            .catch((error) => console.error("Erreur lors de la suppression", error));
    };

    const handleDeleteCV = () => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
        };
        fetch(`${import.meta.env.VITE_API_URL}/api/cv/cv/${cv_id}`, {
            method: "DELETE",
            headers,
        })
            .then((response) => {
                if (response.ok) {
                    navigate("/cvs"); // Redirect to CV list page after deletion
                } else {
                    throw new Error("Erreur lors de la suppression du CV");
                }
            })
            .catch((error) =>
                console.error("Erreur lors de la suppression du CV", error)
            );
    };

    if (!cv) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                Chargement...
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center mt-10">
            <div className="w-[90vw] p-8 bg-white rounded-lg shadow-md max-w-4xl">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    CV de {cv.persoContent?.prenom} {cv.persoContent?.nom}
                </h2>
                {isCreator && (
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={handleDeleteCV}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Supprimer CV
                        </button>
                    </div>
                )}
                {/* Informations personnelles */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-700">
                        Informations personnelles
                    </h3>
                    {isEditing["personalInfo"] ? (
                        <Formik
                            initialValues={{
                                date_naissance: cv.persoContent?.date_naissance || '',
                                email: cv.persoContent?.mail || '',
                            }}
                            onSubmit={(values) =>
                                handleSaveSection(values, {type: "personalInfo", id: cv.persoContent?._id})
                            }
                        >
                            <Form className="space-y-4">
                                <div>
                                    <label className="block text-gray-600">Date de naissance</label>
                                    <Field
                                        name="date_naissance"
                                        type="date"
                                        className="border border-gray-300 p-2 w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600">Email</label>
                                    <Field
                                        name="email"
                                        type="email"
                                        className="border border-gray-300 p-2 w-full"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Sauvegarder
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleEditToggle("personalInfo")}
                                    className="ml-4 bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Annuler
                                </button>
                            </Form>
                        </Formik>
                    ) : (
                        <>
                            <p className="mt-2 text-gray-600">
                                <strong>Date de naissance :</strong>{" "}
                                {cv.persoContent?.date_naissance || 'N/A'}
                            </p>
                            <p className="text-gray-600">
                                <strong>Email :</strong> {cv.persoContent?.mail || 'N/A'}
                            </p>
                            {isCreator && (
                                <button
                                    onClick={() => handleEditToggle("personalInfo")}
                                    className="text-sm text-green-500 underline mt-2"
                                >
                                    Modifier
                                </button>
                            )}
                        </>
                    )}
                </div>
                {/* Formations */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-700">
                        Formations
                    </h3>
                    {cv.expPedago?.length > 0 ? (
                        cv.expPedago.map((formation, index) => (
                            <div key={index} className="border-b border-gray-300 py-4">
                                {isEditing[`formation-${index}`] ? (
                                    <Formik
                                        initialValues={{
                                            nom_diplome: formation.nom_diplome,
                                            certificateur: formation.certificateur,
                                            date: formation.date,
                                            commentaire: formation.commentaire || "",
                                        }}
                                        onSubmit={(values) =>
                                            handleSaveSection(values, {type: "formation", id: formation._id})
                                        }
                                    >
                                        <Form className="space-y-4">
                                            <div>
                                                <label className="block text-gray-600">Diplôme</label>
                                                <Field
                                                    name="nom_diplome"
                                                    className="border border-gray-300 p-2 w-full"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-600">Institution</label>
                                                <Field
                                                    name="certificateur"
                                                    className="border border-gray-300 p-2 w-full"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-600">Date</label>
                                                <Field
                                                    name="date"
                                                    type="date"
                                                    className="border border-gray-300 p-2 w-full"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-600">Commentaire</label>
                                                <Field
                                                    name="commentaire"
                                                    as="textarea"
                                                    className="border border-gray-300 p-2 w-full"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="bg-green-500 text-white px-4 py-2 rounded"
                                            >
                                                Sauvegarder
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleEditToggle(`formation-${index}`)}
                                                className="ml-4 bg-red-500 text-white px-4 py-2 rounded"
                                            >
                                                Annuler
                                            </button>
                                        </Form>
                                    </Formik>
                                ) : (
                                    <>
                                        <p className="text-gray-600">
                                            <strong>Diplôme :</strong> {formation.nom_diplome}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>Institution :</strong> {formation.certificateur}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>Date :</strong> {formation.date}
                                        </p>
                                        {formation.commentaire && (
                                            <p className="text-gray-600">
                                                <strong>Commentaire :</strong> {formation.commentaire}
                                            </p>
                                        )}
                                        {isCreator && (
                                            <>
                                                <button
                                                    onClick={() => handleEditToggle(`formation-${index}`)}
                                                    className="text-sm text-green-500 underline mr-2"
                                                >
                                                    Modifier
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteSection("formation", formation._id)}
                                                    className="text-sm text-red-500 underline"
                                                >
                                                    Supprimer
                                                </button>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Aucune formation disponible.</p>
                    )}
                </div>
                {/* Expériences professionnelles */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-700">
                        Expériences Professionnelles

                    </h3>
                    {cv.expPro?.length > 0 ? (
                        cv.expPro.map((experience, index) => (
                            <div key={index} className="border-b border-gray-300 py-4">
                                {isEditing[`experience-${index}`] ? (
                                    <Formik
                                        initialValues={{
                                            poste_occupe: experience.poste_occupe,
                                            nom_entreprise: experience.nom_entreprise,
                                            date: experience.date,
                                            commentaire: experience.commentaire || "",
                                        }}
                                        onSubmit={(values) =>
                                            handleSaveSection(values, {type: "experience", id: experience._id})
                                        }
                                    >
                                        <Form className="space-y-4">
                                            <div>
                                                <label className="block text-gray-600">Poste</label>
                                                <Field
                                                    name="poste_occupe"
                                                    className="border border-gray-300 p-2 w-full"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-600">Entreprise</label>
                                                <Field
                                                    name="nom_entreprise"
                                                    className="border border-gray-300 p-2 w-full"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-600">Date</label>
                                                <Field
                                                    name="date"
                                                    type="date"
                                                    className="border border-gray-300 p-2 w-full"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-600">Commentaire</label>
                                                <Field
                                                    name="commentaire"
                                                    as="textarea"
                                                    className="border border-gray-300 p-2 w-full"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="bg-green-500 text-white px-4 py-2 rounded"
                                            >
                                                Sauvegarder
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleEditToggle(`experience-${index}`)}
                                                className="ml-4 bg-red-500 text-white px-4 py-2 rounded"
                                            >
                                                Annuler
                                            </button>
                                        </Form>
                                    </Formik>
                                ) : (
                                    <>
                                        <p className="text-gray-600">
                                            <strong>Poste :</strong> {experience.poste_occupe}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>Entreprise :</strong> {experience.nom_entreprise}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>Date :</strong> {experience.date}
                                        </p>
                                        {experience.commentaire && (
                                            <p className="text-gray-600">
                                                <strong>Commentaire :</strong> {experience.commentaire}
                                            </p>
                                        )}
                                        {isCreator && (
                                            <>
                                                <button
                                                    onClick={() => handleEditToggle(`experience-${index}`)}
                                                    className="text-sm text-green-500 underline mr-2"
                                                >
                                                    Modifier
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteSection("experience", experience._id)}
                                                    className="text-sm text-red-500 underline"
                                                >
                                                    Supprimer
                                                </button>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Aucune expérience professionnelle disponible.</p>
                    )}
                </div>
            </div>
            <div className="mb-8 mt-6 bg-white w-[60vw] rounded-lg p-4">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Commentaires
                </h3>
                <ul className="space-y-4">
                    {commentaires.length > 0 ? (
                        commentaires.map((comment, index) => (
                            <li key={index} className="bg-gray-100 p-3 rounded-lg shadow-sm">
                                <p className="text-gray-700 font-semibold">{comment.username}</p>
                                <p className="text-gray-600 mt-1">{comment.content}</p>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">Aucun commentaire disponible.</p>
                    )}
                </ul>
            </div>

            {/* Form to add a comment */}
            <div className="w-[60vw] bg-white rounded-lg p-6 shadow-md mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Ajouter un commentaire</h3>
                <Formik
                    initialValues={{content: ""}}
                    validationSchema={Yup.object({
                        content: Yup.string().required("Le commentaire ne peut pas être vide."),
                    })}
                    onSubmit={handleAddComment}
                >
                    {({errors, touched}) => (
                        <Form className="space-y-4">
                            <div>
                                <label className="block text-gray-600 mb-2">Votre commentaire</label>
                                <Field
                                    name="content"
                                    as="textarea"
                                    className="border border-gray-300 p-2 w-full rounded"
                                    rows="4"
                                />
                                {errors.content && touched.content && (
                                    <div className="text-red-500 text-sm mt-1">{errors.content}</div>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Envoyer
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>


        </div>);
}