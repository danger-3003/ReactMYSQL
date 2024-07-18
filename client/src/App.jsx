import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Update from "./Pages/Update";
import Blogs from "./Pages/Blogs";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const router =createBrowserRouter([
    {
        path: '/',
        element: <Navigation />,
        children :[
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/blogs',
                element: <Blogs />
            },
            {
                path: '/account/:id',
                element: <Update />
            }
        ]
    }
]);

function Navigation(){
    return(
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

function App() {
    return <>
        <RouterProvider router={router} />
    </>;
}

export default App;
