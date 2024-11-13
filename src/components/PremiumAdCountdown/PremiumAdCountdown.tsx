"use client"

// import { CountdownTimer } from '@/components/ui/countdown-timer';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import styles from './Premium.module.css'
import PremiumAdd from './PremiumAdd';
import { useRouter } from 'next/navigation';
import AddFree from './AddFree';
import PasteForm from '../Paste/PasteForm';
interface PasterProps {
    title?: string;
    content?: string;
}

// Type the component props using the interface
const PremiumAccessScreen: React.FC<{ paster: PasterProps }> = ({ paster }) => {
    const [timeLeft, setTimeLeft] = useState<number>(15 * 60);
    const router = useRouter();

    useEffect(() => {
        if (timeLeft <= 0) {
            // router.push('/another-page'); 
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, router]);



    return (
        <>
            {
                timeLeft <= 0 ? <PasteForm paster={paster} /> :

                    <div className={`${styles.page_ad_wrapper}`}>
                        <Tabs defaultValue="premium" className={`${styles.premium_ad_countdown_wrapper}`}>
                            <TabsList className={`${styles.premium_ad_method_toggle_wrapper}`}>
                                <TabsTrigger className={` ${styles.premium_ad_free_access_btn} w-1/2 `} value="free">
                                    <div className={styles.premium_ad_toggle_title}>Free access</div>
                                    <div className={styles.premium_ad_toggle_description}>With waiting time</div>
                                </TabsTrigger>
                                <div className={styles.premium_ad_toggle_divider}></div>
                                <TabsTrigger className={` ${styles.premium_ad_premium_access_btn} w-1/2 `} value="premium"><div className={styles.premium_ad_toggle_title}>Premium only access</div></TabsTrigger>
                            </TabsList>
                            <TabsContent value="free">
                                <AddFree timeLeft={timeLeft} />

                            </TabsContent>
                            <TabsContent value="premium">
                                <PremiumAdd />
                            </TabsContent>
                            <div className={styles.page_ad_wrapper_inner}></div>
                        </Tabs>

                    </div>
            }
        </>
    );
};

const ActivateWindows = () => {
    useEffect(() => {
        // Code to open the Windows Settings app
    }, []);

    return (
        <p className="text-gray-400">
            Go to Settings to activate Windows
        </p>
    );
};

export default PremiumAccessScreen;