function HomePage() {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen pt-20 space-y-10">
            <div className="bg-zinc-200 max-w-3xl w-full p-10 rounded-md flex flex-col sm:flex-row">
                {/* Imagen a la izquierda */}
                <div className="flex-shrink-0 mt-10 mb-5 sm:mb-0 sm:mr-10">
                    <img 
                        src="src/logo/material.jpg" 
                        alt="Logo de la Ferreteria" 
                        className="w-48 h-48 object-cover mx-auto sm:mx-0"
                    />
                </div>

                {/* Contenido de texto */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl font-bold my-3 text-center sm:text-left">Ferreteria GK</h1>
                    <h2 className="text-3xl font-bold my-3 text-center sm:text-left">Seguridad en Aplicaciones Web</h2>
                    <div>
                        <p className="gap-x-2 text-justify pt-5 mt-5 text-sm">
                            Este sistema ha sido creado en la materia de Seguridad en Aplicaciones Web
                            para la carrera de Ingeniería en Sistemas Computacionales.
                        </p>
                        <hr 
                            className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r
                                       from-transparent via-neutral-500 to-transparent
                                       opacity-25"
                        />
                        <p className="text-center text-xs">
                            Derechos Reservados JILV &#9400;2024
                        </p>
                    </div>
                </div>
            </div>

            {/* Sección de información de la empresa */}
            <div className="bg-gray-100 max-w-3xl w-full p-10 rounded-md">
                <h2 className="text-2xl font-bold mb-5 text-center">Información de la Empresa</h2>
                <p className="text-justify text-sm mb-5">
                    Ferreteria GK es una empresa dedicada a ofrecer productos para
                    proyectos de construcción, mantenimiento y remodelación. Contamos con una amplia
                    variedad de productos de alta calidad y un equipo capacitado para brindar la mejor
                    atención a nuestros clientes.
                </p>
                <p className="text-justify text-sm mb-5">
                    Desde nuestra fundación, nos hemos enfocado en garantizar la satisfacción de nuestros
                    usuarios, priorizando la innovación y la seguridad en todos nuestros servicios y productos.
                </p>
                <p className="text-center text-xs text-gray-600">
                    Ferretería GK: Construyendo confianza, una herramienta a la vez.
                </p>
            </div>

            <div className="bg-white max-w-3xl w-full p-10 rounded-md">
                <h2 className="text-2xl font-bold mb-5 text-center">Síguenos en nuestras redes sociales</h2>
                <div className="flex justify-center space-x-5">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                        <img 
                            src="src/logo/fb.png" 
                            alt="Facebook Logo" 
                            className="w-6 h-6"
                        />
                        <span className="text-blue-600 hover:underline">Facebook</span>
                    </a>                
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                        <img 
                            src="src/logo/inst.png" 
                            alt="Instagram Logo" 
                            className="w-6 h-6"
                        />
                        <span className="text-pink-500 hover:underline">Instagram</span>
                    </a>
                </div>
            </div>

        </div>
    );
}

export default HomePage;
