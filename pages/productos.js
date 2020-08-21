import { useQuery } from '@apollo/client'
import Layout from 'components/Layout'
import Producto from 'components/Producto'
import { OBTENER_PRODUCTOS } from 'config/queries'

export default function Productos() {
  // Consultar productos
  const { data, loading } = useQuery(OBTENER_PRODUCTOS)

  if (loading) return 'Cargando...'

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Productos</h1>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Existencia</th>
              <th className="w-1/5 py-2">Precio</th>
              <th className="w-1/5 py-2">Eliminar</th>
              <th className="w-1/5 py-2">Editar</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.obtenerProductos.map(producto => (
              <Producto key={producto.id} producto={producto} />
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  )
}
