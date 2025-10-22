
import { Rocket, ShieldCheck, Repeat } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const GettingStarted = () => {
    const { t } = useTranslation();

    return (
        <div className="rounded-xl shadow-xl p-6 mb-8
                    bg-surface border border-border"
        >
            <h2 className="text-2xl font-bold text-center mb-6 text-text">
                {t('getting_started')}
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
                <StepCard
                    icon={<ShieldCheck size={32} className="text-primary-accent" />}
                    title={t('step1_title')}
                    description={t('step1_desc')}
                />
                <StepCard
                    icon={<Repeat size={32} className="text-primary-accent" />}
                    title={t('step2_title')}
                    description={t('step2_desc')}
                />
                <StepCard
                    icon={<Rocket size={32} className="text-primary-accent" />}
                    title={t('step3_title')}
                    description={t('step3_desc')}
                />
            </div>
        </div>
    );
};


const StepCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="p-4 rounded-lg
                bg-background border border-border">
        <div className="flex justify-center mb-3">{icon}</div>
        <h3 className="text-lg font-semibold mb-2 text-text">
            {title}
        </h3>
        <p className="text-sm text-text-secondary">
            {description}
        </p>
    </div>
);

export default GettingStarted;