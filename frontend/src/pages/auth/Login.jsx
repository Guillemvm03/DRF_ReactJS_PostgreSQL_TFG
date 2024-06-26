import React, { useState } from "react";
import { Button, Label, TextInput } from 'flowbite-react';
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useTranslation } from "react-i18next"; // Importa useTranslation

const Login = () => {
    const { t } = useTranslation(); // Obtiene la función t() para traducción
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function sendData() {
        let user = {
            email: email,
            password: password
        }
        login(user);
    }

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                {t('VIEWS.CREDENTIALS.LOGIN.title')} {/* Traduce el título usando la función t() */}
                            </h1>
                            <form className="flex max-w-md flex-col gap-4">
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="user" value={t('VIEWS.CREDENTIALS.LOGIN.email')} /> {/* Traduce el texto del label usando la función t() */}
                                    </div>
                                    <TextInput id="user" type="text" placeholder="user@example.com" required shadow  onChange={(event) => setEmail(event.target.value)}/>
                                </div>

                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="password" value={t('VIEWS.CREDENTIALS.LOGIN.password')} /> {/* Traduce el texto del label usando la función t() */}
                                    </div>
                                    <TextInput id="password" type="password" required shadow onChange={(event) => setPassword(event.target.value)} />
                                </div>

                                <Button type="button" className="mt-5" onClick={() => sendData()}>{t('VIEWS.CREDENTIALS.LOGIN.login')}</Button> {/* Traduce el texto del botón usando la función t() */}
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    {t('VIEWS.CREDENTIALS.LOGIN.redirect-register')} {/* Traduce el texto usando la función t() */}
                                    <Link to="/auth/register" className="ms-2 font-medium text-primary-600 hover:underline dark:text-primary-500">{t('VIEWS.CREDENTIALS.REGISTER.register')}</Link> {/* Traduce el texto del enlace usando la función t() */}
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;
