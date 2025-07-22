export const Navbar = () => {
    return(
        <nav className="w-full h-16 bg-white/90 backdrop-blur-md shadow-sm flex rounded-md px-4 z-50">
            <div className="w-full m-auto flex justify-between">
                <div className="p-2"><p className="text-xs"><span className="text-gray-400">Algo</span> / Algo</p> <h1 className="font-bold">Home</h1></div>
                <div className="h-full p-5">
                </div>
                <div className="">
                   <ul className="flex space-x-2 w-full h-full items-center">
                    <li className="hover:bg-gray-400 w-8 h-8 rounded-full flex justify-center items-center cursor-pointer"><i className="fa-solid fa-gear"></i></li>
                    <li className="hover:bg-gray-400 w-8 h-8 rounded-full flex justify-center items-center cursor-pointer"><i className="fa-solid fa-bell"></i></li>
                   </ul>
                </div>
            </div>
        </nav>
    )
}