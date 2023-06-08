import '../styles/globals.css';
import '../styles/modal.css';
import { Analytics } from '@vercel/analytics/react';
import { useRouter } from 'next/router';
import NextProgress from "next-progress";

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    return (
        <>
            <Component {...pageProps} key={router.asPath} />
            <Analytics />
            <NextProgress color={'#F87171'} height={'4px'} />
        </>
    );
}

export default MyApp;