import React, { useContext } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../context/UserContext.jsx";

export default function LoginScreen() {
  const navigate = useNavigate();
  const { user, login } = useContext(UserContext);

  if (user) {
    navigate("/", { replace: true });
  }

  const handleRegisterClick = () => {
    navigate("/register");
  };

  console.log(import.meta.env.VITE_API_URL);
  console.log(`https://onlinecv-production.up.railway.app/api/auth/login`);

  return (
    <div className="flex items-center justify-center mt-14">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              const response = await fetch(
                `https://onlinecv-production.up.railway.app/api/auth/login`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                  }),
                }
              );
              if (response.ok) {
                const data = await response.json();

                console.log(data);

                login(data.user, data.token);
                navigate("/", { replace: true });
              } else {
                const errorData = await response.json();
                if (errorData.message === "Email inconnu") {
                  setFieldError("email", "Email inconnu");
                } else if (errorData.message === "Mot de passe incorrect") {
                  setFieldError("password", "Mot de passe incorrect");
                } else {
                  console.log("Erreur lors de la connexion", errorData);
                }
              }
            } catch (error) {
              console.log(error.message);
            } finally {
              setSubmitting(false);
            }
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Adresse email invalide")
              .required("Email requis"),
            password: Yup.string().required("Mot de passe requis"),
          })}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
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
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mot de passe:
                </label>
                <Field
                  className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                  type="password"
                  name="password"
                  placeholder="Entrez votre mot de passe"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 font-bold text-white bg-sky-500 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  {isSubmitting ? "Connexion..." : "Se connecter"}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <a
                  id="register"
                  className="text-xs hover:text-blue-500 cursor-pointer"
                  onClick={handleRegisterClick}
                >
                  Créer un Compte
                </a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
