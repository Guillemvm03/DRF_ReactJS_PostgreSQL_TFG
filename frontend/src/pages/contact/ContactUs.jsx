import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from 'flowbite-react';
import { useToastr } from '../../hooks/useToastr';
import { useAuth } from '../../hooks/useAuth';
import secrets from '../../secrets';
import { useTranslation } from 'react-i18next'; // Importa useTranslation

export default function ContactUs() {
    const form = useRef();
    const { useCreateToastr } = useToastr();
    const { user } = useAuth();
    const { t } = useTranslation(); // Obtiene la función t() para traducción

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(secrets.EMAILJS.SERVICE_ID, secrets.EMAILJS.TEMPLATE_ID, form.current, {
                publicKey: secrets.EMAILJS.PUBLIC_KEY,
            })
            .then(
                () => {
                    useCreateToastr({ status: true , message: t('TOASTR.emailSent') }); 
                    form.current.reset();
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    useCreateToastr({ status: true, error: 'error', message: t('TOASTR.emailFailedToSend') }); 
                },
            );
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">{t('VIEWS.CONTACT_US.title')}</h2> {/* Traduce el título utilizando la función t() */}
                <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">{t('VIEWS.CONTACT_US.description')}</p> {/* Traduce la descripción utilizando la función t() */}
                <form ref={form} onSubmit={sendEmail} className="space-y-8">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t('VIEWS.CONTACT_US.yourName')}</label> {/* Traduce el texto del label utilizando la función t() */}
                        <input type="text" id="name" name='user_name' defaultValue={user.username} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" disabled required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t('VIEWS.CONTACT_US.yourEmail')}</label> {/* Traduce el texto del label utilizando la función t() */}
                        <input type="email" id="email" name='user_email' defaultValue={user.email} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" disabled required />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{t('VIEWS.CONTACT_US.yourMessage')}</label> {/* Traduce el texto del label utilizando la función t() */}
                        <textarea id="message" name='message' rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={t('VIEWS.CONTACT_US.leaveComment')}></textarea> {/* Traduce el placeholder utilizando la función t() */}
                    </div>
                    <Button color="blue" type='submit'>{t('VIEWS.CONTACT_US.sendMessage')}</Button> {/* Traduce el texto del botón utilizando la función t() */}
                </form>
            </div>
        </section>
    );
}
