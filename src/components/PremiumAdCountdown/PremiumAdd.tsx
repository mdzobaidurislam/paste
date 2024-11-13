import React from "react";
import styles from './Premium.module.css'
export default function PremiumAdd() {
    return (
        <div className="flex flex-col items-center justify-center ">
            <div className={styles.premium_ad_premium_access_title}>
                Access now with premium
            </div>
            <a
                href="/premium?source=paste&amp;id=22186498aa10d29ac2519fdc5dc86c92-p-aa1662b48877b2e9500b6f7584be625f&amp;waitingTimeSeconds=900"
                id="premiumOpen"
                rel="noopener noreferrer"
                className={styles.premium_ad_firstcta}
            >
                <span className={styles.premium_ad_cta_text}>Go premium →</span>
                <span className={styles.premium_ad_backdrop} style={{ zIndex: 5 }}></span>
            </a>{" "}
        </div>
    );
}
