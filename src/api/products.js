import axios from './axios';

//llamada al api para obtener todos los productos
export const getProductsRequest = () => axios.get('/products');

//llamada al api para obtener todos los productos sin importar el usuario
export const getAllProductsRequest = () => axios.get('/getallproducts');

export const getProductRequest = (id) =>axios.get('/products/'+id);

export const createProductRequest = (product) => axios.post('/products', product,{
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export const deleteProductRequest =(id) => axios.delete('/products/'+id);

export const updateProductRequest = (id,product) => axios.put('/products/'+id,product,{
    headers:{
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    }
});

export const updateProductRequestNoUpdateImage =(id, product) => axios.put('/productupdatenoimage/'+id, product);