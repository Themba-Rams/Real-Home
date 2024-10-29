import React, { useState } from 'react';
import "./Login.css";
import { FaHouseUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { app, provider } from '../firebase'; // Import provider from firebase
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [isLoginMode, setIsLoginMode] = useState(true); // State to track mode
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth(app);

        try {
            if (isLoginMode) {
                // Log in existing user
                await signInWithEmailAndPassword(auth, email, password);
                console.log("Login successful");
            } else {
                // Create a new user
                await createUserWithEmailAndPassword(auth, email, password);
                console.log("Account Created");
            }

            // Store authentication status
            localStorage.setItem("isAuth", "true");
            navigate('/'); // Redirect to homepage
        } catch (err) {
            console.log(err);
        }
    };

    // Google sign-in function
    const signInWithGoogle = async () => {
        const auth = getAuth(app);
        try {
            await signInWithPopup(auth, provider);
            localStorage.setItem("isAuth", "true");
            navigate('/'); // Redirect to homepage
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    return (
        <div className={'wrapper'}>
            <form onSubmit={handleSubmit}>
                <h1>{isLoginMode ? 'Login' : 'Sign Up'}</h1>
                <div className={'inputBox'}>
                    <input 
                        type="text" 
                        placeholder='Email' 
                        required 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <FaHouseUser className={'icon'} />
                </div>
                <div className={'inputBox'}>
                    <input 
                        type="password" 
                        placeholder='Password' 
                        required 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <RiLockPasswordFill className='icon' />
                </div>
                <button type="submit" className='Loginbtn'>
                    {isLoginMode ? 'Login' : 'Sign Up'}
                </button>
                <div className={'registerLink'}>
                    <p>
                        {isLoginMode ? 'Don\'t have an account?' : 'Already have an account?'} 
                        <span onClick={() => setIsLoginMode(!isLoginMode)} className={'toggle'}>
                            {isLoginMode ? ' Sign Up' : ' Login'}
                        </span>
                    </p>
                </div>
            </form>

            {/* Google Login Button */}
            <button onClick={signInWithGoogle} className='Googlebtn'>
                Sign in with Google
            </button>
        </div>
    );
}

export default Login;




