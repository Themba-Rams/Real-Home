import Navbar from "./NavBar/Navbar.jsx"
import Hpage from "./Homepage/Hpage.jsx";
import Signup from "./Log_sign/Login.jsx";
import Login from "./Log_sign/Sign.jsx";
import Agents from "./Agents/Agents.jsx";
import List  from  "./Listings/List.jsx";
import Sell from "./Sell/sell.jsx";
import { BrowserRouter,Routes, Route, RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Rootlayout/RootLayout.jsx";


function App() {
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
    ]
   }
    // {
    //   path: '/login',
    //   element: <Login />
    // },
    
  ])

  return (
    // <>
    //   <BrowserRouter>
    //     <Navbar />
    //     <Routes>
    //       <Route path="/" element={<Hpage />} /> {/* Homepage */}
    //       <Route path="/signup" element={<Signup />} /> {/* Sign-up page */}
    //       <Route path="/login" element={<Login />} /> {/* Sign-up page */}
    //     </Routes>
    //   </BrowserRouter>
    // </>


    <RouterProvider router={router} />

  );
}

export default App;