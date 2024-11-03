import React, { useState } from 'react';
import './createL.css';
import Spinner from '../components/spinner.jsx';
import { toast } from "react-toastify";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { serverTimestamp } from "firebase/firestore";

function CreateL() {
    const auth = getAuth();
    const [geolocationEnabled, setGeoLocationEnabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        type: "rent",
        name: "",
        bedrooms: 1,
        bathrooms: 1,
        Address: "",
        Description: "",
        Price: 0,
        latitude: 0,
        longitude: 0,
        images: {}
    });
    const { type, name, bedrooms, bathrooms, Address, Description, Price, latitude, longitude, images } = formData;

    function onChange(e) {
        let boolean = null;
        const { id, value, type, files } = e.target;

        if (value === "true") boolean = true;
        if (value === "false") boolean = false;

        if (files) {
            setFormData((prevState) => ({
                ...prevState,
                images: Array.from(files),
            }));
        } else {
            const updatedValue = type === "number" ? Number(value) : value;

            setFormData((prevState) => ({
                ...prevState,
                [id]: boolean ?? updatedValue,
            }));
        }
    }

    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        if (images.length > 6) {
            setLoading(false);
            toast.error("Maximum 6 images are allowed");
            return;
        }

        let geolocation = {};
        let location;
        if (geolocationEnabled) {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${Address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
            );
            const data = await response.json();
            geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
            geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;
            location = data.status === "ZERO_RESULTS" && undefined;

            if (location === undefined) {
                setLoading(false);
                toast.error("Please enter a correct address");
                return;
            }
        } else {
            geolocation.lat = latitude;
            geolocation.lng = longitude;
        }

        async function storeImage(image) {
            return new Promise((resolve, reject) => {
                const storage = getStorage();
                const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
                const storageRef = ref(storage, filename);
                const uploadTask = uploadBytesResumable(storageRef, image);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                    },
                    (error) => {
                        reject(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL);
                        });
                    }
                );
            });
        }

        const imgUrls = await Promise.all(
            [...images].map((image) => storeImage(image))
        ).catch((error) => {
            setLoading(false);
            console.error(error);
            toast.error("Images not uploaded");
            return;
        });

        const formDataCopy = {
            ...formData,
            imgUrls,
            geolocation,
            timestamp: serverTimestamp(),
            userRef: auth.currentUser.uid,
        };
        delete formDataCopy.images;
        delete formDataCopy.latitude;
        delete formDataCopy.longitude;

        // Add your code to save formDataCopy to Firestore here

        setLoading(false);
        toast.success("Listing created successfully");
    }

    if (loading) {
        return <Spinner />;
    }

    return (
        <main className='main'>
            <h1 className='head'>Create a Listing</h1>
            <form onSubmit={onSubmit}>
                <p className='SR'>Sell / Rent</p>
                <div className='d1'>
                    <button type="button" id="type" value="sale" onClick={onChange}
                        style={{
                            position: 'relative',
                            right: '250px',
                            paddingLeft: '1.75rem',
                            paddingRight: '2rem',
                            paddingTop: '0.75rem',
                            paddingBottom: '0.75rem',
                            borderRadius: '5px',
                            fontSize: '20px',
                            fontWeight: 700,
                            width: '100%',
                            transition: 'all 150ms ease-in-out',
                            backgroundColor: type === 'sale' ? 'black' : 'white',
                            color: type === 'sale' ? '#FFD700' : 'black',
                            boxShadow: type === 'sale' ? '0 0 10px 5px gold' : '0 15px 20px rgba(0, 0, 0, 0.1)',
                            border: 'none',
                            cursor: 'pointer',
                            margin: '0.5rem 0'
                        }}
                    >
                        SELL
                    </button>
                    <button type="button" id="type" value="rent" onClick={onChange}
                        style={{
                            position: 'relative',
                            right: '250px',
                            paddingLeft: '1.75rem',
                            paddingRight: '1.75rem',
                            paddingTop: '0.75rem',
                            paddingBottom: '0.75rem',
                            borderRadius: '5px',
                            fontSize: '20px',
                            fontWeight: 700,
                            width: '100%',
                            transition: 'all 150ms ease-in-out',
                            backgroundColor: type === 'rent' ? 'black' : 'white',
                            color: type === 'rent' ? '#FFD700' : 'black',
                            boxShadow: type === 'rent' ? '0 0 10px 5px gold' : '0 15px 20px rgba(0, 0, 0, 0.1)',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        RENT
                    </button>
                </div>
                <p className='Name'>Name</p>
                <input type="text" id="name" value={name} onChange={onChange} placeholder='Property name' maxLength="32" minLength="10" required className='Pname' />

                <div className=''>
                    <div>
                        <p className='beds'>Beds</p>
                        <input type="number" id="bedrooms" value={bedrooms} onChange={onChange} min="1" max="20" required className='rooms' />
                    </div>
                    <div>
                        <p className='beds'>Baths</p>
                        <input type="number" id="bathrooms" value={bathrooms} onChange={onChange} min="1" max="20" required className='rooms' />
                    </div>
                </div>

                <p className='Name'>Address</p>
                <textarea id="Address" value={Address} onChange={onChange} placeholder='Address' maxLength="32" minLength="10" required className='Pname'></textarea>
                
                <p className='Name'>Description</p>
                <textarea id="Description" value={Description} onChange={onChange} placeholder='Description' maxLength="32" minLength="10" required className='Pname'></textarea>

                {!geolocationEnabled && (
                    <div>
                        <div>
                            <p className='beds'>Latitude</p>
                            <input type='number' id='latitude' value={latitude} onChange={onChange} required min="-90" max="90" className='rooms' />
                        </div>
                        <div>
                            <p className='beds'>Longitude</p>
                            <input type='number' id='longitude' value={longitude} onChange={onChange} required min="-180" max="180" className='rooms' />
                        </div>
                    </div>
                )}

                <div>
                    <div>
                        <p className='priceT'>Price</p>
                        <input type="number" id="Price" value={Price} onChange={onChange} min="10000" max="5000000000" required className='price' />
                    </div>
                    {type === "rent" && (
                        <div>
                            <p className='permonth'>Rent/ Rands per Month</p>
                        </div>
                    )}
                </div>

                <div>
                    <p className='imageT'>Images</p>
                    <p className='imagemax'>The first image will be the cover (max 6)</p>
                    <input type="file" id="images" onChange={onChange} accept=".jpg, .png, .jpeg" multiple required className='imgupload' />
                </div>

                <button type='submit' className='create'>Create Listing</button>
            </form>
        </main>
    );
}


export default CreateL;