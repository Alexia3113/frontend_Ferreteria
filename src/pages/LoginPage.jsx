import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate,Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoPersonAdd, IoLogIn, IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import ReCaptcha from 'react-google-recaptcha';
import { Tooltip } from "@material-tailwind/react";

 function LoginPage() {
  const {register,handleSubmit, formState: {errors}} = useForm();
  const {signin, isAuthenticated,isAdmin ,errors:signInErrors} = useAuth();
  const [passwordShowm, setPasswordShown] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null)

  const tooglePasswordVisibility = () =>{
    setPasswordShown(passwordShowm? false:true);
  }

  const navigate = useNavigate();
 useEffect( ()=>{
    if(isAuthenticated)
      if(isAuthenticated)
        if(isAdmin)
          navigate('/products')
        else       
          navigate('/getallproducts');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isAuthenticated])

  const onSubmit = handleSubmit( (data)=>{
    //console.log(data);
    signin(data);
  })

  return (
    <div className="flex items-center justify-center h-screen" aria-hidden="false">
      <div className="bg-zinc-300 max-w-md x-full p-10 rounded-md">
      <div className="hidden md:block w-1/2">
          <img 
            src="src/logo/herramientas.jpg" 
            className="w-full h-full object-cover rounded-md justify-center"
          />
    </div>
        <h1 className='text-3xl font-bold'>Login</h1>
        {
                signInErrors.map( (error,i)=>(
                    <div className='bg-red-500 p-2 my-2 text-white' key={i}>
                        {error}
                    </div>
                ))
            }
          <form onSubmit={onSubmit}>
            <label htmlFor='email'>Email</label>
                <input type="email" className='w-full bg-zinc-100 text-black px-4 py-2 rounded-md my-2'
                        placeholder='email'
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
                  <div className='flex justify-end items-center relative'>
                  <input type={passwordShowm? "text": "password"} 
                      className='w-full bg-zinc-100 text-black px-4 py-2 rounded-md my-2'
                      placeholder='Password'
                      {
                          ...register("password",{required:true,minLength:6})
                      }
                  />
                  {
                    passwordShowm? <IoEyeSharp size={30} className='absolute mr-2 w-10'
                                              onClick={tooglePasswordVisibility} />
                                   :
                                   <IoEyeOffSharp size={30} className='absolute mr-2 w-10'
                                                  onClick={tooglePasswordVisibility}/>
                  }
                  { errors.password?.type==="required" &&(
                      <p className='text-red-500'>Password requerido</p>
                  )}
                  { errors.password?.type==="minLenght" && (
                      <p className='text-red-500'>La longitud minima es de 6 caracteres</p>
                  )}
                </div>
                <Tooltip content="Iniciar sesión" placement="right-end">
                    <button className='bg-zinc-700 px-3 py-3 my-3 rounded-md'
                          type="submit"
                          disabled={!captchaValue}>
                    <IoLogIn size={30}/>
                  </button>
                </Tooltip>
               <ReCaptcha sitekey='6LcqG5wqAAAAAKUIB8qZ5CC9Ql74lVVrSolTd5KT'
                        onChange={(value)=> setCaptchaValue(value)} 
                        aria-hidden="false"/>
            </form>
            <div className='flex gap-x-2 justify-between pt-5 mt-5'>
            ¿No tienes una cuenta?
            <Link to='/register' className='text-sky-500'>
              <div className='flex mx-2 px-2 items-start'>
                !Crea una! <IoPersonAdd size={30} className='mx-1'/>
              </div>
            </Link>
          </div>
      </div>
    </div>
  )
}

export default LoginPage
