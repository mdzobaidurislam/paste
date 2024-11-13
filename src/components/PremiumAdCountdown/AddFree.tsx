// eslint-disable-next-line @typescript-eslint/no-explicit-any
import React, { useState, useEffect } from 'react';
import styles from './Premium.module.css';
import { useRouter } from 'next/navigation';
import { formatTime } from '@/lib/utils';

interface AddFreeProps {
    timeLeft: number;
}

const AddFree: React.FC<AddFreeProps> = ({ timeLeft }) => {
    return (
        <div className={styles.premium_ad_free_access}>
            <h2>Paste Content hidden</h2>
            <p className={styles.premium_ad_ct_text}>
                Wait before unlocking this exclusive content to avoid spam. <br />
                You must wait 15 Minutes...
            </p>
            <div className={styles.premium_ad_countdown}>
                <div className={styles.premium_ad_timeSection}>
                    <span className={styles.premium_ad_countdown_time}>
                        {formatTime(timeLeft).split(':')[0]}
                    </span>
                    <span className={styles.premium_ad_countdown_label}>Minutes</span>
                </div>
                <div className={styles.premium_ad_timeSection}>
                    <span className={styles.premium_ad_countdown_time}>
                        {formatTime(timeLeft).split(':')[1]}
                    </span>
                    <span className={styles.premium_ad_countdown_label}>Seconds</span>
                </div>
            </div>
            <a
                href="/premium?source=paste&amp;id=22186498aa10d29ac2519fdc5dc86c92-p-aa1662b48877b2e9500b6f7584be625f&amp;waitingTimeSeconds=900"
                aria-label="Open premium purchase window"
                className={styles.premium_ad_ct_footer}
                rel="noopener noreferrer"
                style={{ cursor: 'default' }}
            >
                <b>⚡ Avoid ads &amp; waiting time?</b>
            </a>
            <ul>
                <div>
                    <button
                        aria-label="Open premium purchase window"
                        style={{ cursor: 'default' }}
                    >
                        Access now
                    </button>
                    from just $2.50 for 30 days instant access to unlimited exclusive content<br />
                </div>
            </ul>
            <a
                href="/premium?source=paste&amp;id=22186498aa10d29ac2519fdc5dc86c92-p-aa1662b48877b2e9500b6f7584be625f&amp;waitingTimeSeconds=900"
                id="premiumOpen"
                rel="noopener noreferrer"
                className={styles.premium_ad_firstcta}
            >
                <span className={styles.premium_ad_cta_text}>Skip by going premium →</span>
                <span className={styles.premium_ad_backdrop} style={{ zIndex: 5 }}></span>
            </a>
        </div>
    );
}
export default AddFree