import { useState, useEffect } from 'react';
import './profile.css';
import { getAuth, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { db } from '../firebase'; 
import { doc, updateDoc } from "firebase/firestore"; 
import { BsHouses } from "react-icons/bs";
import { Link } from 'react-router-dom'; // Import Link

function Profile() {
    const auth = getAuth();
    const [formData, setFormData] = useState({
        name: auth.currentUser ? auth.currentUser.displayName : '',
        email: auth.currentUser ? auth.currentUser.email : '',
    });
    const { name, email } = formData;

    // State to manage edit mode
    const [changeDetail, setChangeDetail] = useState(false);

    useEffect(() => {
        if (auth.currentUser) {
            setFormData({
                name: auth.currentUser.displayName,
                email: auth.currentUser.email,
            });
        }
    }, [auth.currentUser]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const user = auth.currentUser;
        if (user) {
            try {
                if (user.displayName !== name) {
                    await updateProfile(user, { displayName: name });
                    const docRef = doc(db, "users", user.uid);
                    await updateDoc(docRef, { name });
                }
                toast.success("Profile details updated");
                setChangeDetail(false); // Reset the edit mode
            } catch (error) {
                toast.error("Could not update the profile details: " + error.message);
            }
        }
    };

    return (
        <section className='sec1'>
            <h1 className='Head'>My Profile</h1>
            <div className='d1'>
                <form onSubmit={onSubmit}>
                    <input
                        type='text'
                        id='name'
                        value={name}
                        disabled={!changeDetail}
                        onChange={onChange}
                        className='name'
                    />
                    <input
                        type='email'
                        id='email'
                        value={email}
                        disabled
                        className='email'
                    />
                    <div className='d2'>
                        <p className='change'>
                            Do you want to change your name?
                            <span className='span' onClick={() => {
                                if (changeDetail) {
                                    onSubmit(); // Save changes if in edit mode
                                }
                                setChangeDetail((prev) => !prev); // Toggle edit mode
                            }}>
                                {changeDetail ? 'Apply change' : 'EDIT'}
                            </span>
                        </p>
                    </div>
                </form>
                <button type='button' className= 'lis'> {/* Change type to 'button' */}
                    <Link to="/createL" style={{ color: 'inherit', textDecoration: 'none' }}> {/* Add inline styles to keep button styles */}
                        <BsHouses />
                        Create a listing
                    </Link>
                </button>
            </div>
        </section>
    );
}

export default Profile;

