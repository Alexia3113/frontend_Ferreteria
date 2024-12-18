import { useForm, Controller } from "react-hook-form";
import { useProducts } from "../context/ProductContext";
import uploadIcon from '../assets/addphoto.svg';
import { useState,useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoBagAdd, IoCloseSharp } from "react-icons/io5";
import { Tooltip } from "@material-tailwind/react";


function ProductsFormPage() {
    const server = 'http://localhost:4000/img/'
    const {register,handleSubmit, control, setValue, formState:{errors}} = useForm({
        defaultValues:{
            name:'',
            price: 0.0,
            year: new Date().getFullYear(),
            image:uploadIcon
        }
    });
    const {createProduct, getProduct, updateProductNoUpdateImage, updateProduct,
        errors:productErrors
    } = useProducts();    
    const [selectedImage, setSelectedImage] = useState(uploadIcon);
    const inputImage = useRef(null);
    const navigate = useNavigate();
    const params = useParams();
    const [updateImage, setUpdateImage] = useState(false);

    useEffect( ()=>{
        async function loadProduct(){
            console.log(params)
            if(params.id){//si existe en los params un id
                //obtenemos los datos del producto
                const product = await getProduct(params.id);
                console.log(product);
                setValue('name', product.name);
                setValue('descripcion', product.descripcion)
                setValue('price', product.price);
                setValue('cantidad', product.cantidad);
                setValue('image', product.image);
                setSelectedImage(server+product.image);
            }
        }//fin de loadProduct
        loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = handleSubmit( (data) =>{
        const formData = new FormData();
        //Agregar datos al FormData
        formData.append('name',data.name); //nombre del producto
        formData.append('descripcion', data.descripcion ); //descripcion del producto
        formData.append('price', data.price); //precio del producto
        formData.append('cantidad',data.cantidad); //cantidad del producto
        formData.append('image', data.image); //imagen del producto

        if(data.image == "/src/assets/addphoto.svg"){
            productErrors.push("No se ha elegido una imagen")
            return
        }
 
        if(params.id){
            if(!updateImage){
                const updateData={
                    "name":data.name,
                    "descripcion": data.descripcion,
                    "precio": data.price.toString(),
                    "cantidad": data.cantidad.toString(),
                    "image": data.image
                }
                updateProductNoUpdateImage(params.id,updateData);
            }else{
                updateProduct(params.id,formData);
            }
        }else{
                createProduct(formData);
        }
        navigate('/products');
    })//fin de onSubmit

    const handleImageClick = ( ()=>{
        inputImage.current.click();
    })// fin de handleImageClick

    const handleImageChange = (e, field) =>{
        const file = e.target.files[0];
        setSelectedImage(file? URL.createObjectURL(file):uploadIcon);
        field.onChange(file);
        setUpdateImage(true);
    }
    return (
        <div className="flex items-center justify-center h-screen pt-20">
            <div className="bg-zinc-300 max-w-md x-full p-10 rounded-md">
            <h1 className='text-3xl font-bold'>Productos</h1>
            {
                productErrors?.map((error, i) =>(
                    <div className='text-red-500 p-2 my-2' key={i}>
                        {error}
                    </div>
                ))
            }
            <form onSubmit={onSubmit}>
            <label htmlFor='name'>Nombre</label>
                <input type="text" 
                    className="w-full bg-zinc-100 text-black px-4 py-2 rounded-md my-2"
                    placeholder='Nombre del producto'
                    {
                        ...register("name")
                    }
                    autoFocus
                 />
                 { errors.name && ( 
                        <div className='text-red-500'>Nombre del producto es requerido</div>
                    )}
                <label htmlFor='descripcion'>Descripcion</label>
                 <input type="text" className="w-full bg-zinc-100 text-black px-4 py-2 rounded-md my-2"
                    placeholder='descripcion'
                    {
                        ...register("descripcion")
                    }
                    autoFocus
                 />
                 { errors.descripcion && ( 
                        <div className='text-red-500'>Descripcion del producto es requerido</div>
                )}
                <label htmlFor='price'>Precio</label>
                <input type="number" step="0.10" className='w-full bg-zinc-100 text-black px-4 py-2 rounded-md my-2'
                    placeholder='Precio del producto'
                    {
                        ...register("price",{
                            required: true,
                            min:0.0,
                            valueAsNumber:true,
                        })
                    }
                />
                { errors.price &&(
                    <div className='text-red-500'>El precio del producto es requerido</div>
                )}
                {errors.price?.type ==="min" &&(
                    <div className='text-red-500'>El precio mínimo es 0</div>
                )}
                <label htmlFor='cantidad'>Cantidad del producto</label>
                <input type="number" 
                    className='w-full bg-zinc-100 text-black px-4 py-2 rounded-md my-2'
                    placeholder='Cantidad del producto'
                    {
                        ...register("cantidad",{
                            required: true
                        })
                    }
                />
                 {errors.cantidad &&(
                        <div className='text-red-500'>la cantidad del producto es requerido</div>
                )}
                {errors.cantidad?.type ==="min" &&(
                        <div className='text-red-500'>la cantidad mínimo es 0</div>
                )}
                <div className='py-2 my-2'>
                    {
                        selectedImage && (
                            <img 
                                src={selectedImage}
                                alt="Imagen seleccionada"
                                width={200}
                                height={200}
                                className="max-h[200px] object-contain"
                                onClick={handleImageClick}
                            />
                        )
                    }
                    <Controller 
                        name="image"
                        control={control}
                        render={({field})=>(
                            <input 
                                type="file"
                                ref={inputImage}
                                onChange={(e)=>handleImageChange(e,field)}
                                className='hidden'
                            />
                        )}
                    />
                </div>
                <Tooltip content = "Aceptar" placement="bottom-end">
                    <button className="bg-green-300 hover:bg-green-500
                                text-white font-semibold hover:text-white
                                py-2 px-4 border border-zinc-500
                                hover:border-transparent rounded" >
                            <IoBagAdd size={30} />
                        </button> 
                </Tooltip>
                <Tooltip content="Cancelar" placement="bottom-end">
                    <button className="bg-red-300 ml-4
                            text-white font-semibold hover:bg-red-700
                            py-2 px-4 border border-zinc-500
                            hover:border-transparent rounded"
                            onClick={()=>{navigate('/products')}}>
                        <IoCloseSharp size={30} />
                    </button>  
                </Tooltip>     
            </form>
        </div>
        </div>
    )   
}

export default ProductsFormPage