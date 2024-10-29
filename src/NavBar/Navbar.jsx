import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { signOut, onAuthStateChanged } from 'firebase/auth'; // Import signOut and onAuthStateChanged
import { auth } from '../firebase'; // Import auth from your firebase config

function Navbar() {
    const [isAuth, setIsAuth] = useState(false);

    // Check if user is authenticated on initial render
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuth(true);
                localStorage.setItem("isAuth", true); // Set auth status in local storage
            } else {
                setIsAuth(false);
                localStorage.setItem("isAuth", false); // Clear auth status
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.removeItem("isAuth"); // Clear specific auth key
            setIsAuth(false);
            window.location.pathname = '/Login'; // Redirects to login page
        }).catch((error) => {
            console.error("Error signing out:", error);
        });
    };

    return (
        <div className={'bgnav'}>
            <nav className={'navbar'}>
                <img className={'NLogo'} src="assets/NLogo.png" alt="logo" />
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/List">Listings</Link></li>
                    <li><Link to="/Agents">Agents</Link></li>
                </ul>
                <li className={'button1'}>
                    {!isAuth 
                        ? <Link to="/Login" className={'links'}>Sign up / Login</Link> 
                        : <button onClick={signUserOut} className={'links2'}>Log out</button>  
                    }
                </li>
            </nav>
        </div>
    );
}

export default Navbar;
