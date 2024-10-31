import React, { useState, useEffect } from "react"; // Import useState and useEffect
import Navbar from "./NavBar/Navbar.jsx";
import Hpage from "./Homepage/Hpage.jsx";
import Signup from "./Log_sign/Login.jsx";
import Agents from "./Agents/Agents.jsx";
import Profile from "./Profile/profile.jsx";
import List from "./Listings/List.jsx";
import CreateL from "./Listings/CreateL.jsx"; // Ensure 'CreateL' is capitalized
import Sell from "./Sell/sell.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Rootlayout/RootLayout.jsx";
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toast CSS
import Spinner from './components/spinner.jsx'; // Ensure the import path is correct

function App() {
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    // Simulate loading data or fetch your data here
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a loading delay of 1 second
      setLoading(false); // Set loading to false after data is loaded
    };
    loadData();
  }, []);

  // If loading, show the spinner
  if (loading) {
    return <Spinner />; // Render the Spinner component while loading
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <Hpage />
        },
        {
          path: '/Agents',
          element: <Agents />
        },
        {
          path: '/Login',
          element: <Signup />
        },
        {
          path: '/List',
          element: <List />
        },
        {
          path: '/sell',
          element: <Sell />
        },
        {
          path: '/Profile',
          element: <Profile />
        },
        {
          path: '/createL', // Route for creating listings
          element: <CreateL /> // Use 'CreateL' with uppercase 'C'
        },
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer /> {/* Add ToastContainer here */}
    </>
  );
}

export default App;
