import Logo from "../assets/logo.png"
export const NavBar = () => {
  return (
    <nav className="w-full h-20 z-50 bg-transparent fixed top-0 flex flex-row items-center justify-between gap-4 px-4">
        <img 
        className="w-20 h-10"
        src={Logo} alt="Logo" />
        <div className="flex flex-row gap-4 text-white">
            <p>Home page</p>
            <p>Search page</p>
        </div>
    </nav>
  )
}
