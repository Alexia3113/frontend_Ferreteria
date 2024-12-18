import { BrowserRouter,Route,Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ProductsPage from './pages/ProductsPage';
import ProductsFormPage from './pages/ProductsFormPage';
import ProtectedRoute from './ProtectedRoute';
import { ProductsProvider } from './context/ProductContext';
import Navbar from './components/Navbar';
import AllProductsPage from './pages/AllProductsPage';
import { CarritoPage } from './pages/CarritoPage';
import UsuariosPage from './pages/UsuariosPage';


function App(){
  return(
    <AuthProvider>
      <ProductsProvider>
        <BrowserRouter
            future = {{
              v7_starTransition: true,
              v7_relativeSplatPath:true
            }}
        >
          <main className='container mx-auto px-10'>
              <Navbar />
              <Routes>
                {/*Rutas públicas */}
                <Route path='/' element={<HomePage/>}/>
                <Route path='/login' element={<LoginPage />}/>
                <Route path='/register'element={<RegisterPage />}/>

                {/*Seccion para rutas protegidas */}
                <Route element={<ProtectedRoute />}>
                    <Route path='/profile' element={<ProfilePage />}/>
                    <Route path='/products' element={<ProductsPage />}/>
                    <Route path='/add-product' element={<ProductsFormPage />}/>
                    <Route path='/product/:id' element={<ProductsFormPage />}/>
                    <Route path='/getallproducts/' element={<AllProductsPage />}/>
                    <Route path='/carrito' element={<CarritoPage />}/>
                   <Route path='/verusuarios' element={<UsuariosPage />}/>
                </Route>
              </Routes>
          </main>
        </BrowserRouter>
      </ProductsProvider>
    </AuthProvider>
  )
}

export default App