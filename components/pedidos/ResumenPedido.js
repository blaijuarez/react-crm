import { useContext } from 'react'
import PedidoContext from 'context/pedido/PedidoContext'
import ProductoResumen from './ProductoResumen'

export default function ResumenPedido() {
  // Context de pedidos
  const pedidoContext = useContext(PedidoContext)
  const { productos } = pedidoContext

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        3.- Austa las cantidades del producto
      </p>
      {productos.length ? (
        <>
          {productos.map(producto => (
            <ProductoResumen key={producto.id} producto={producto} />
          ))}
        </>
      ) : (
        <p className="mt-5 text-sm">No hay productos</p>
      )}
    </>
  )
}
