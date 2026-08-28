import { Link, useLocation } from "react-router"
import Logo from "../assets/logo.png"
import { useEffect, useState } from "react"
export const NavBar = () => {
    const location = useLocation()
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        function choicePage() {
            if (location.pathname === "/") {
                setCurrentPage(0)
            } else if (location.pathname === "/search") {
                setCurrentPage(1)
            }
        }
        choicePage()
    }, [location.pathname])

    const activeStyle = "text-pink-600 border-b-4 border-pink-600"
    return (
        <div>
            <nav className="w-full h-20 absolute z-50 
   flex flex-row items-center justify-between gap-4 px-4">
                <img
                    className="w-20 h-10"
                    src={Logo} alt="Logo" />
                <div className="flex flex-row gap-4 text-white cursor-pointer">
                    <Link to={'/'} className={`bold  transition-all ${currentPage === 0 && activeStyle}`}>Home page</Link>
                    <Link to={'/search'} className={`bold  transition-all ${currentPage === 1 && activeStyle}`}>Search page</Link>
                </div>
            </nav>
            <nav className="w-screen p-0 h-24 z-40 fixed 
            bg-linear-to-b from-black to-100%
   flex flex-row items-center justify-between gap-4 px-4">
            </nav>
        </div>
    )
}
//bg-linear-to-b from-[#111111] to-100%
//bg-radial-[at_70%_120%] from-20% to-[#111111] to-60%