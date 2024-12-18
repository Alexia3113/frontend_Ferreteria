import PropTypes from "prop-types";
import { useProducts } from "../context/ProductContext";
import { Link } from "react-router-dom";
import { IoTrashBinSharp, IoPencilSharp, IoCarSharp } from "react-icons/io5";
import {Tooltip} from '@material-tailwind/react';
import { useAuth } from "../context/AuthContext";

function ProductCard({product}) {
    const { deleteProduct, carrito, addCarrito: addproduct} = useProducts();
    const {isAdmin}=useAuth();

    const server = 'http://localhost:4000/img/'

    const addCarrito = () => {
        console.log("Agregar carrito", product);
        addproduct(product)
        console.log(carrito);      
    }

    return (
        <div className="bg-zinc-200 max-w-md w-full p-10 rounded-sm">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{product.name}</h1>
            </header>
            {isAdmin &&
                    <div className="flex gap-x-2 justify-end">
                        <Tooltip content="Eliminar">
                            <button  className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm'
                                onClick={ ()=>{
                                    //console.log(product._id)
                                    deleteProduct(product._id)
                                }}
                                    data-tooltip-target="tooltip-listar"
                                >
                                    <IoTrashBinSharp />
                            </button>
                        </Tooltip>
                        <Tooltip content="Actualizar">
                            <button className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm'>
                                <Link to={'/products/'+product._id}>
                                    <IoPencilSharp />
                                </Link>
                            </button>
                        </Tooltip>
                    </div>
             }
            <div className="flex justify-center">
                <img 
                    src={server+product.image}
                    alt="Imagen seleccionada"
                    width={200}
                    height={200}
                    className="max-h[200px] object-contain flex my-2 py-2"
                />
            </div>
            <div className="flex">
            <p className="text-black my-2 flex"> 
                        <span>Descripcion:</span>{product.descripcion}
                    </p>
            </div>
            <div className="flex">
                    <p className="text-black my-2 flex"> 
                        <span>Precio:</span>{product.price}
                    </p>
            </div>
            <div className=" space-y-4">
                <p className="text-black my-2 flex mb-4">
                    <span>Cantidad:</span>{product.cantidad}
                </p>
                <button 
                className='bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg text-sm '
                onClick={addCarrito}
                >                 
                    <IoCarSharp />                  
                </button>
            </div>
        </div>
    )
}

export default ProductCard

ProductCard.propTypes={
    product: PropTypes.any
}