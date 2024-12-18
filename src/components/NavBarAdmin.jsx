import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {Menu,MenuButton, MenuItem,MenuItems} from '@headlessui/react'
import { IoLogOut, IoPerson,
    IoChevronDownSharp, IoBagSharp, IoBagAdd, IoPersonAdd
} from "react-icons/io5";


function NavBarAdmin() {
    const {isAuthenticated,logout, user} = useAuth();
    const navigate = useNavigate();
    return(
        <nav className="bg-zinc-200 my-3 flex justify-between items-start
                                py-5 px-10 rounded-lg">
                    <Link to={
                        isAuthenticated ? '/products' : '/'}>
                        <h1 className="text-2xl font-bold">Productos</h1>
                    </Link>
                    <ul className="flex gap-x-2">
                                    <li>
                                        <div className='flex mx-3 px-3'>
                                            <IoPerson size={30}/>{user.username}
                                        </div>
                                    </li>
                                    <li>
                                        <Menu>
                                                <MenuButton className="inline-flex items-center gap-2 rounded-md bg-zinc-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                                                Productos
                                                <IoChevronDownSharp className=" fill-white/60" size={30} />
                                                </MenuButton>
        
                                                <MenuItems
                                                transition
                                                anchor="bottom end"
                                                className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                                                >
                                                <MenuItem>
                                                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10"
                                                        onClick={()=>{navigate('/product')}}>
                                                    <IoBagSharp className="size-4 fill-black/30" size={30}/>
                                                    Listar
                                                    </button>
                                                </MenuItem>
                                                <MenuItem>
                                                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10"
                                                        onClick={()=>{navigate('/add-product')}}>
                                                    <IoBagAdd className=" fill-black/30" size={30} />
                                                    Agregar Producto
                                                    </button>
                                                </MenuItem>
                                                <MenuItem>
                                                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10"
                                                        onClick={()=>{navigate('/register')}}>
                                                    <IoPersonAdd className=" fill-black/30" size={30}/>
                                                    Agregar Usuario
                                                    </button>
                                                </MenuItem>
                                                <MenuItem>
                                                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10"
                                                        onClick={()=>{navigate('/verusuarios')}}>
                                                    <IoPerson className=" fill-black/30" size={30}/>
                                                    Ver Usuarios
                                                    </button>
                                                </MenuItem>
                                                <div className="my-1 h-px bg-white/5" size={30}/>
                                                <MenuItem>
                                                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10"
                                                        onClick={()=>{logout()}}>
                                                    <IoLogOut className=" fill-black/30" size={30}/>
                                                    Salir
                                                    </button>
                                                </MenuItem>
                                                </MenuItems>
                                       </Menu>
                                    </li>
                    </ul>
                </nav>
    )   
}

export default NavBarAdmin;