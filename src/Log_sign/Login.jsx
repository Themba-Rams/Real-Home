import { useState } from 'react';
import './Login.css'; // Ensure this file exists and styles the component
import { FaHouseUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { app, provider } from '../firebase'; // Ensure this imports correctly
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function Login() {
    const navigate = useNavigate();
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth(app);

        try {
            if (isLoginMode) {
                // Login
                await signInWithEmailAndPassword(auth, email, password);
                toast.success("Login successful"); // Success toast for login
            } else {
                // Signup
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Update the user's display name
                await updateProfile(user, { displayName: username });
                toast.success("Account Created"); // Success toast for signup
            }

            localStorage.setItem("isAuth", "true");
            navigate('/'); // Redirect to homepage after successful login/signup
        } catch (err) {
            toast.error("Authentication failed: " + err.message); // Error toast for authentication failure
            console.error(err);
        }
    };

    const signInWithGoogle = async () => {
        const auth = getAuth(app);
        try {
            await signInWithPopup(auth, provider);
            localStorage.setItem("isAuth", "true");
            navigate('/'); // Redirect after successful Google sign-in
            toast.success("Signed in with Google"); // Success toast for Google sign-in
        } catch (error) {
            toast.error("Error signing in with Google: " + error.message); // Error toast for Google sign-in failure
            console.error("Error signing in with Google:", error);
        }
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>{isLoginMode ? 'Login' : 'Sign Up'}</h1>
                {!isLoginMode && (
                    <div className='inputBox'>
                        <input
                            type="text"
                            placeholder='Username'
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <FaHouseUser className='icon' />
                    </div>
                )}
                <div className='inputBox'>
                    <input
                        type="email" // Ensure email type for validation
                        placeholder='Email'
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FaHouseUser className='icon' />
                </div>
                <div className='inputBox'>
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
                <div className='registerLink'>
                    <p>
                        {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
                        <span onClick={() => setIsLoginMode(!isLoginMode)} className='toggle'>
                            {isLoginMode ? ' Sign Up' : ' Login'}
                        </span>
                    </p>
                </div>
            </form>

            <button onClick={signInWithGoogle} className='Googlebtn'>
                Sign in with Google
            </button>
        </div>
    );
}

export default Login;



