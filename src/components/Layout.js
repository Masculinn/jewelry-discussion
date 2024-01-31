import Head from "next/head";

import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";

export default function Layout({ children }) {
    const router = useRouter();
    const [session, setSession] = useState(null); // Initialize with null
    const [isActive, setisActive] = useState(false);

    useEffect(() => {
        // Fetch session asynchronously after component mount
        const fetchSession = async () => {
            try {
                const userSession = await supabase.auth.getSession();
                setSession(userSession);
            } catch (error) {
                console.error('Error fetching session:', error);
            }
        };

        fetchSession();

        // Subscribe to changes in authentication state
        const authSubscription = supabase.auth.onAuthStateChange((_event, userSession) => {
            setSession(userSession);
        });

        // Cleanup subscription on component unmount
        return () => {
            // Check if the object has an unsubscribe method before calling it
            if (authSubscription) {
                authSubscription.data.subscription.unsubscribe();
            }
        };
    }, []);


    return (
        <>
            <Head>
                <title>Jewelry E-trade Forum</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <nav className="navbar sticky top-0 left-0 z-50 mb-5 py-3" role="navigation" aria-label="main navigation">
                <div className="container is-max-desktop">
                    <div className="navbar-brand">
                            <a className="navbar-item" href="/"><h1 className='is-size-5 ml-1'>BURAK BILEN.</h1></a>
                        <a
                            onClick={() => {
                                setisActive(!isActive)
                            }}
                            role='button'
                            className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
                            aria-label='menu'
                            aria-expanded='false'
                            data-target='navbarTarget'
                        >
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id='navbarTarget' className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                        <div className="navbar-end">
                                <a href="/posts" className={'navbar-item'}>Forum</a>
                            {session
                                ? <>
                                    <a href="/posts/create" className={'navbar-item'}>New+</a>
                                     <a href='/profile' className="navbar-item"> Profile </a>
                                    <a className="navbar-item" onClick={() => {
                                        supabase.auth.signOut()
                                        router.push('/')
                                    }}> Log Out </a>
                                </>
                                : <a href='/login' className={'navbar-item'}>Login</a>
                            }
                        </div>
                    </div>
                </div>
            </nav>

            <main className="bg-white">
                <div className="container bg-white is-fluid">
                    <div className="container bg-white is-max-desktop">
                        {children}
                    </div>
                </div>
            </main>
        </>
    )
}