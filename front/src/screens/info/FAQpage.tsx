// src/screens/info/FAQPage.tsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedBackground from "@/components/common/AnimatedBackground.tsx";
import Header from "@/components/common/Header.tsx";

const base = import.meta.env.BASE_URL || '/';

interface FAQContent {
    questionKey: string;
    answerKey: string;
    imageUrls?: string[];
    imageAltKeys?: string[];
}

interface FAQCategory {
    categoryTitleKey: string;
    items: FAQContent[];
}

const faqStructure: FAQCategory[] = [
    {
        categoryTitleKey: "faq_cat_general",
        items: [
            { questionKey: "q_what_is_crypto", answerKey: "a_what_is_crypto" },
            { questionKey: "q_what_is_blockchain", answerKey: "a_what_is_blockchain" },
            { questionKey: "q_what_is_btc", answerKey: "a_what_is_btc" },
            { questionKey: "q_what_are_altcoins", answerKey: "a_what_are_altcoins" },
        ]
    },
    {
        categoryTitleKey: "faq_cat_market_data",
        items: [
            { questionKey: "q_how_is_market_cap_calculated", answerKey: "a_how_is_market_cap_calculated" },
            { questionKey: "q_what_is_circulating_supply", answerKey: "a_what_is_circulating_supply" },
            {
                questionKey: "q_how_is_circulating_supply_calculated_cg",
                answerKey: "a_how_is_circulating_supply_calculated_cg",
                imageUrls: ["img/faq/faq1.jpg", "img/faq/faq2.jpg"],
                imageAltKeys: ["img_alt_circulating_supply_sol", "img_alt_circulating_supply_matic"]
            },
            { questionKey: "q_how_often_updated", answerKey: "a_how_often_updated" },
        ]
    },
];

const FAQPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen font-sans bg-background text-text">
            <Header/>
            <AnimatedBackground/>
            <main className="container mx-auto p-4 md:p-8 relative z-10 flex-grow">
                <h1 className="text-3xl md:text-4xl font-extrabold text-center my-8 text-text">
                    {t('faq_title')}
                </h1>

                <div className="max-w-3xl mx-auto space-y-10">
                    {faqStructure.map((category, catIndex) => (
                        <section key={catIndex}>
                            <h2 className="text-2xl font-bold mb-5 text-primary-accent border-b border-border pb-2">
                                {t(category.categoryTitleKey)}
                            </h2>
                            <div className="space-y-6">
                                {category.items.map((item, itemIndex) => (
                                    <article key={itemIndex}>
                                        <h3 className="text-lg font-semibold mb-2 text-text">
                                            {itemIndex + 1}. {t(item.questionKey)}
                                        </h3>
                                        <div className="text-text-secondary leading-relaxed space-y-4">
                                            <div dangerouslySetInnerHTML={{ __html: t(item.answerKey) }} />

                                            {item.imageUrls && item.imageUrls.length > 0 && (
                                                <div className="mt-4 space-y-4">
                                                    {item.imageUrls.map((url, imgIndex) => (
                                                        <img
                                                            key={imgIndex}
                                                            src={`${base}${url}`}
                                                            alt={item.imageAltKeys?.[imgIndex] ? t(item.imageAltKeys[imgIndex]) : 'FAQ Image'}
                                                            className="max-w-full h-auto rounded border border-border"
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default FAQPage;