"use client";
import React from 'react';

import Script from 'next/script'
import SubscribeButton from './subscribe_button';

export default function Header() {
    const [isNotificationEnabled, setIsNotificationEnabled] = React.useState(true);
    const updateNotificationStatus = (notificationStatus: any) => {
        setIsNotificationEnabled(notificationStatus);
    }

    return (
        <div>
            {/* Add manifest and apple-touch-icon */}
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

            {/* Add Google Analytics script */}
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-S2DHEHCCVL"></Script>
            <Script id="google-analytics">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-S2DHEHCCVL');
                `}
            </Script>
            <div className="flex items-center basis-0 text-sm font-semibold bg-slate-900 text-slate-50 " style={ isNotificationEnabled ? { display: 'none' } : { display: 'block' }}>
                Please give notification permission to use subscriptions services.
            </div>
            {/* Header section */}
            <header className="sticky top-0 z-50 flex items-center justify-between px-3 py-2 border-b shadow-lg bg-white/90 backdrop-blur-sm border-slate-400/40">
                <div className="flex items-center flex-grow basis-0">
                    <a href="https://briefings.dev" className="text-lg font-semibold tracking-tight text-slate-900">
                        Briefings.dev
                    </a>
                    <SubscribeButton func={ updateNotificationStatus } />
                </div>
            </header>
        </div>
    );
}
