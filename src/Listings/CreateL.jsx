import React, { useState } from 'react';
import './createL.css';
import Spinner from '../components/spinner.jsx'

function CreateL() {
    const [geolocationEnabled, setGeoLocationEnabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        type: "rent",
        name:"",
        bedrooms: 1,
        bathrooms: 1,
        Address: "",
        Description:"",
        Price:0,
        latitude: 0,
        longitude: 0
    });
    const { type ,name,bedrooms,bathrooms, Address,Description,Price,latitude, longitude} = formData;

    function onChange(e) {
        let boolean = null;
        if (e.target.value === "true") {
          boolean = true;
        }
        if (e.target.value === "false") {
          boolean = false;
        }
        // Files
        if (e.target.files) {
          setFormData((prevState) => ({
            ...prevState,
            images: e.target.files,
          }));
        }
        // Text/Boolean/Number
        if (!e.target.files) {
          setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: boolean ?? e.target.value,
          }));
        }
      }
      function onSubmit(e){
        e.preventDefault();
        setLoading(true);
      }

      if(loading){
        return <Spinner/>
      }
     
    return (
        <main className='main'>
            <h1 className='head'>Create a Listing</h1>
            <form onSubmit={onSubmit}>
                <p className='SR'>Sell / Rent</p>
                <div className='d1'>
                    <button
                        type="button"
                        id="type"
                        value="sale"
                        onClick={onChange}
                        style={{
                            position: 'relative', 
                            right: '250px',
                            paddingLeft: '1.75rem',
                            paddingRight: '2rem',
                            paddingTop: '0.75rem',
                            paddingBottom: '0.75rem',
                            boxShadow: '0 15px 20px rgba(0, 0, 0, 0.1)',
                            borderRadius: '5px',
                            fontSize: '20px',
                            fontWeight: 700,
                            width: '100%',
                            transition: 'all 150ms ease-in-out',
                            backgroundColor: type === 'sale' ? 'black' : 'white',
                            color: type === 'sale' ? '#FFD700' : 'black', 
                            boxShadow: type === 'sale'? '0 0 10px 5px gold' : '0 15px 20px rgba(0, 0, 0, 0.1)',
                            border: 'none',
                            cursor: 'pointer',
                            margin: '0.5rem 0'
                        }}
                    >
                        SELL
                    </button>
                    <button
                        type="button"
                        id="type"
                        value="rent"
                        onClick={onChange}
                        style={{
                            position: 'relative', 
                            right: '250px',
                            paddingLeft: '1.75rem',
                            paddingRight: '1.75rem',
                            paddingTop: '0.75rem',
                            paddingBottom: '0.75rem',
                            boxShadow: '0 15px 20px rgba(0, 0, 0, 0.1)',
                            borderRadius: '5px',
                            fontSize: '20px',
                            fontWeight: 700,
                            width: '100%',
                            transition: 'all 150ms ease-in-out',
                            backgroundColor: type === 'rent' ? 'black' : 'white',
                            color: type === 'rent' ? '#FFD700' : 'black', 
                            boxShadow: type === 'rent'? '0 0 10px 5px gold' : '0 15px 20px rgba(0, 0, 0, 0.1)',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        RENT
                    </button>
                </div>
                <p className='Name'> Name</p>
                <input type="text" id="name" value={name} onChange={onChange} placeholder='Property name' maxLength="32" minLength="10" required className='Pname'></input>
           <div className=''>
            <div >
                <p className='beds'>Beds</p>
                <input type="number" id="bedrooms" value={bedrooms} onChange={onChange} min="1" max="20" required className='rooms'/>

            </div>
            <div >
                <p className='beds'>Baths</p>
                <input type="number" id="bathrooms" value={bathrooms} onChange={onChange} min="1" max="20" required className='rooms'/>

            </div>
           </div>
                <p className='Name'> Address</p>
                <textarea type="text" id="Address" value={Address} onChange={onChange} placeholder='Address' maxLength="32" minLength="10" required className='Pname'></textarea>
                <p className='Name'> Description</p>
                <textarea type="text" id="Description" value={Description} onChange={onChange} placeholder='Description' maxLength="32" minLength="10" required className='Pname'></textarea>
                {!geolocationEnabled &&(
                    <div>
                        <div>
                            <p className='beds'>Latitude</p>
                            <input type='number' id='latitude' value={latitude} onChange={onChange} required min="-90" max= "90" className='rooms'></input>
                           </div>
                           <div>
                            <p className='beds'>Longitude</p>
                            <input type='number' id='longitude' value={longitude} onChange={onChange} required  min="-180" max= "1800"className='rooms'></input>
                        </div>
                    </div>
                )}
            
                <div>
                    <div>
                        <p className='priceT'>Price</p>
                        <input type="number" id="Price" value={Price} onChange={onChange} min="10000" max="5000000000" required className='price'/>
                    </div>
                    {type === "rent" && (
                        <div> 
                        <p className='permonth'>Rent/ Rands per Month  </p>  
                        </div>
                    ) }
                </div>
                <div>
                    <p className='imageT'>
                        images
                    </p>
                    <p className='imagemax'> the first image will be the cover (max 6)</p>
                    <input type="file"
                     id="images" onChange={onChange}
                    accept= ".jpg, .png, .jpeg" multiple required
                    className='imgupload'
                      ></input>
                </div>
                <button type='submit' className='create' >Create Listing</button>
            </form>
        </main>
    );
}

export default CreateL;


