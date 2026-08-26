import { Outlet } from "react-router"; // or "react-router-dom"
import Navbar from "./Navbar";

export default function RootLayout() {
    return (
        <>
            <Outlet />
        </>


    );
}
