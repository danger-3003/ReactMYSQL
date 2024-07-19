import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Profile from "./Pages/Profile";
import Update from "./Pages/Update";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const router =createBrowserRouter([
    {
        path: '/',
        element: <Navigation />,
        children :[
            {
                path: '/',
                element: <Profile />
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
