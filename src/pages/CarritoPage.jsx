import { Card, Typography } from "@material-tailwind/react";
import { useProducts } from "../context/ProductContext";
 
const TABLE_HEAD = ["Product Name", "Imagen", "Precio"];
 
export function CarritoPage() {
const {carrito, deleteCarrito}= useProducts();
console.log(carrito);

const server = import.meta.env.VITE_URL_FERRE+"/img/"
return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="p-4 pt-10">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {carrito.map(({ name, image, price },index) => {
            return (
              <tr key={index}>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                  >
                    {name}
                  </Typography>
                </td>
                <td className="p-4">
                    <img src={server+image} className="w-11 h-11"
                    />
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {price}
                  </Typography>
                </td>
                <td className="p-4">
                  <button
                  onClick={()=>deleteCarrito(index)}
                    className="font-normal text-gray-600"
                  >
                    eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot className="border-t border-gray-300">
          <tr>
            <td className="p-4">
              <Typography
                color="blue-gray"
                variant="small"
                className="font-bold"
              >
                Total
              </Typography>
            </td>
            <td className="p-4">

            </td>
            <td className="p-4">
              <Typography
                color="blue-gray"
                variant="small"
                className="font-bold"
              >
                {
                    carrito.reduce( (suma,card)=> suma+card.price,0)
                }
              </Typography>
            </td>
          </tr>
        </tfoot>
      </table>
    </Card>
  );
}