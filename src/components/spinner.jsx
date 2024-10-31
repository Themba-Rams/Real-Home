import React from 'react';
import spinner from "../assets/svg/spinner.svg"; // Ensure the path to the image is correct

function Spinner() {
  return (
    <div className='bg-black bg-opacity-50 flex items-center justify-center h-screen'> {/* Full-screen overlay */}
      <img src={spinner} alt='Loading...' className="h-70 w-80" /> {/* Increase the size by using h-48 and w-48 */}
    </div>
  );
}

export default Spinner;

