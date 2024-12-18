import {useForm} from 'react-hook-form';
import { useAuth } from '../context/AuthContext.jsx';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IoPersonAdd, IoLogIn } from 'react-icons/io5';
import ReCaptcha from 'react-google-recaptcha';
import { Tooltip } from '@material-tailwind/react';

function RegisterPage() {
    const {register, handleSubmit, formState:{errors} }= useForm();
    const {signup, isAuthenticated, isAdmin,errors:registerErrors }  = useAuth();
    const navigate = useNavigate();
    const [captchaValue, setCaptchaValue] = useState(null)
    console.log(registerErrors)

    useEffect( ()=>{
        if(isAuthenticated && !isAdmin)
            navigate('/products')
    }, [isAuthenticated, navigate,isAdmin])


    const onSubmit = handleSubmit ( async(values)=>{
        console.log(values);
        signup(values);
    })//fin de onSubmit

    return(
        <div className="flex items-center justify-center h-screen pt-20" aria-hidden="false"> 
            <div className=' bg-zinc-300 max-w-md x-full p-10 rounded-md'>
            <h1 className='text-3xl font-bold'>Register</h1>
            {
                registerErrors.map( (error,i)=>(
                    <div className='bg-red-500 p-2 my-2 text-white' key={i}>
                        {error}
                    </div>
                ))
            }
            <form onSubmit={onSubmit}>
                <label htmlFor='username'>Username</label>
                <input type="text" className='w-full bg-zinc-100 text-black px-4 py-2 rounded-md my-2'
                        placeholder='Username'
                    {
                        ...register("username", {required: true, minLength:5})
                    }
                />
                { errors.username?.type==='required' &&(
                    <p className='text-red-500'>Nombre de usuario requerido</p>
                )}
                {errors.username?.type ==="minLength" && (
                    <p className='text-red-500'>La longitud minima es de 5 caracteres</p>
                )}
                <label htmlFor='apellido'>Apellido</label>
                <input type="text" className='w-full bg-zinc-100 text-black px-4 py-2 rounded-md my-2 '
                         placeholder='apellido'
                    {
                        ...register("apellido",{required: true, minLength:5 })
                    }
                />
                { errors.apellido &&(
                    <p className='text-red-500'>Apellido es requerido</p>
                )}
                <label htmlFor='email'>Email</label>
                <input type="email" className='w-full bg-zinc-100 text-black px-4 py-2 rounded-md my-2'
                        placeholder='Correo electronico'
                    {
                        ...register("email",{required: true,
                                            pattern:{
                                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ,
                                                message: 'Porfavor ingresa un correo valido'
                                            },
                        })
                    } 
                />
                 { errors.email?.type==='required' &&(
                    <p className='text-red-500'>Email requerido</p>
                )}
                {errors.email?.message && (
                    <p className='text-red-500'>Email no válido</p>
                )}

                <label htmlFor='password'>Password</label>
                <input type="password" 
                    className='w-full bg-zinc-100 text-black px-4 py-2 rounded-md my-2'
                    placeholder='Password'
                    {
                        ...register("password",{required:true,minLength:6})
                    }
                />
                { errors.password?.type==="required" &&(
                    <p className='text-red-500'>Password requerido</p>
                )}
                { errors.password?.type==="minLenght" && (
                    <p className='text-red-500'>La longitud minima es de 6 caracteres</p>
                )}
                <Tooltip content="Registrar" placement="right-end">
                        <button className='bg-transparent hover:bg-zinc-500 text-zinc-500 font-semibold
                        hover:text-white 
                        px-4 py-3 my-3 border-zinc-500 hover:border-transparent mb-2'
                                type="submit" disabled={!captchaValue}>
                                    <IoPersonAdd size={30} />
                        </button>
                </Tooltip>
                <ReCaptcha sitekey='6LcqG5wqAAAAAKUIB8qZ5CC9Ql74lVVrSolTd5KT'
              onChange={(value)=> setCaptchaValue(value)} 
              aria-hidden="false"/>
            </form>
            <div className='flex gap-x-2 justify-between pt-5 mt-5'>
              ¿Ya tienes una cuenta?
              <Link to='/login' className='text-sky-500'>
                    <div className='flex mx-2 px-2 items-start'>
                        !Inicia sesión! <IoLogIn size={30} className='mx-1'/>
                    </div>
                </Link>            
            </div>
        </div>
        </div>
        
    )  
}

export default RegisterPage