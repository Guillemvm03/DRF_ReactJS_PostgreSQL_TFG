import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const PricingPage = () => {
    const { t } = useTranslation(); 

    const navigate = useNavigate();

    return (
        <>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{t('VIEWS.PRICING.title')}</h2> 
                        <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">{t('VIEWS.PRICING.description')}</p>
                    </div>
                    <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                        <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                            <h3 className="mb-4 text-2xl font-semibold">{t('VIEWS.PRICING.starter')}</h3>
                            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">{t('VIEWS.PRICING.starterDescription')}</p>
                            <div className="flex justify-center items-baseline my-8">
                                <span className="mr-2 text-5xl font-extrabold">10</span>
                                <span className="text-gray-500 dark:text-gray-400">.00€</span>
                            </div>

                            <a onClick={() => navigate('/payment/' + 10)} className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">{t('VIEWS.PRICING.getStarted')}</a>
                        </div>


                        <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                            <h3 className="mb-4 text-2xl font-semibold">{t('VIEWS.PRICING.company')}</h3> 
                            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">{t('VIEWS.PRICING.companyDescription')}</p> 
                            <div className="flex justify-center items-baseline my-8">
                                <span className="mr-2 text-5xl font-extrabold">30</span>
                                <span className="text-gray-500 dark:text-gray-400">.00€</span>
                            </div>
                            <a onClick={() => navigate('/payment/' + 30)} className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">{t('VIEWS.PRICING.getStarted')}</a> 
                        </div>

                        <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                            <h3 className="mb-4 text-2xl font-semibold">{t('VIEWS.PRICING.enterprise')}</h3> 
                            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">{t('VIEWS.PRICING.enterpriseDescription')}</p> 
                            <div className="flex justify-center items-baseline my-8">
                                <span className="mr-2 text-5xl font-extrabold">50</span>
                                <span className="text-gray-500 dark:text-gray-400">.00€</span>
                            </div>
                            <a onClick={() => navigate('/payment/' + 50)} className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">{t('VIEWS.PRICING.getStarted')}</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PricingPage;
